import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/jwt';
import Unauthenticated from '../errors/unauthenticated';
interface AuthenticatedRequest extends Request {
    user?: any; 
  }
function authenticateUser(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token && verifyToken(token)) {
      console.log("verifyToken true", verifyToken);
      req.user = verifyToken(token) ; 
      next()
    } else {
     res.send('You are not authenticated');
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export default authenticateUser;
