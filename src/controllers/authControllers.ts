import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { hashPassword, comparePasswords } from "../helpers/password";
import { generateToken, verifyToken } from "../helpers/jwt";
import {BadRequestError,NotFoundError} from "../errors";
import NotFound from "../errors/not-found";
import { body } from "express-validator";
import User from "../models/userModels";
import connectDB from "../models/db";
import { isAdmin } from "../middlewares/checkAdmin";

interface RegisterUserBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface LoginUserBody {
  email: string;
  password: string;
}
interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

const AuthController = {
  registerUser: async (req: Request, res: Response): Promise<void> => {
    await check('firstname').notEmpty().withMessage('Firstname is required').run(req);
    await check('lastname').notEmpty().withMessage('Lastname is required').run(req);
    await check('email').isEmail().withMessage('Please provide a valid email').run(req);
    await check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array()});
    }
    const { firstname, lastname, email, password } =
      req.body as RegisterUserBody;

    try {
      const user = await User.findOne({ email });

      if (user) {
        res
          .status(400)
          .json({ message: `This email is not valid, try another one` });

        return;
      }

      const hashedPassword = await hashPassword(password);
      const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
       
      });

      await newUser.save();

      console.log(
        `New user registered: ${newUser.firstname} (${newUser.email})`
      );
      res.send(`New user registered: ${newUser.firstname} (${newUser.email})`);
    } catch (error: any) {
      console.error("Error registering new user:", error);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  },

  loginUser: async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as LoginUserBody;
    await check('email').isEmail().withMessage('Please provide a valid email').run(req);
    await check('password').notEmpty().withMessage('Password is required').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
       return;
    }

    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new NotFoundError("User not found");
      }

      const isMatch = await comparePasswords(password, user.password);
      console.log(isMatch);

      if (!isMatch) {
        throw new BadRequestError("Email or password incorrect!");
      }
      const usertoken = {
        id: user.id,
        email: user.email,
        isAdmin:user.isAdmin,
      };
      const token = generateToken(usertoken);
      console.log("token", token);
      res.setHeader("Authorization", `Bearer ${token}`);
      res.send({ message: `${user.firstname}  ${user.lastname} . you are connected` ,token});
    } catch (error: any) {
      console.error(error.message);
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  },

  authenticateUser: (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token && verifyToken(token)) {
      console.log("verifyToken true", verifyToken);
      res.send("You are authenticated");
    } else {
      res.status(401).send("You are not authenticated");
      /**  console.log('verifyToken else', verifyToken(token));*/
    }
  },

  updateUser: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {

    await check('oldPassword').notEmpty().withMessage('Old password is required').run(req);
    await check('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { oldPassword, newPassword } = req.body;
    const user_Id = req.user?.id;
    console.log("user_Id", user_Id);
    try {
      const user = await User.findOne({ _id: user_Id });
      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      const compare = await comparePasswords(oldPassword, user.password);
      if (!compare) {
        res.status(400).send("Old password is incorrect");
        return;
      }

      const hashedPassword = await hashPassword(newPassword);

      await User.updateOne({ _id: user_Id }, { password: hashedPassword });

      res.status(200).send("User updated");
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).send("Error updating user");
    }
  },
};



export default AuthController;
