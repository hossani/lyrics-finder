import  express  from "express";
import songRouter from "./songRoute";
import artistRouter from "./artistRoute";
import userRouter from "./userRoute";

const routes = express.Router();

routes.use(songRouter);
routes.use(artistRouter);
routes.use(userRouter);

export default routes;
