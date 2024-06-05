import express from 'express';
import AuthController from '../controllers/authControllers';
import authenticateUser from '../middlewares/authMiddlewares'

const router = express.Router();

router.post('/auth/login', AuthController.loginUser);
router.post('/auth/register', AuthController.registerUser);
router.put('/auth/update', authenticateUser,AuthController.updateUser);
router.post('/auth/check', authenticateUser,(req,res)=>{
    res.send("i m middleware")
});

export default router;
