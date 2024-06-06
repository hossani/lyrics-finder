import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";

interface User {
  id: string;
  email: string;
  isAdmin:boolean;
  
}

function generateToken(user: User): string {
  const payload = {
    id: user.id,
    email: user.email,
    isAdmin:user.isAdmin,
  };

  const secret = process.env.JWT_SECRET as string; 
  const options: SignOptions = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
}


function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export { generateToken, verifyToken };
