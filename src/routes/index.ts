import  express  from "express";
import songRouter from "./songRoute";
import artistRouter from "./artistRoute";

const routes = express.Router();

routes.use(songRouter);
routes.use(artistRouter);

export default routes;
