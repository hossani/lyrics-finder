import  express  from "express";
import songRouter from "./songRoute";
import artistRouter from "./artistRoute";
import userRouter from "./userRoute";
import authroutes from './authRoute'
const routes = express.Router();

routes.use(songRouter);
routes.use(artistRouter);
routes.use(userRouter);
routes.use(authroutes);

export default routes;
