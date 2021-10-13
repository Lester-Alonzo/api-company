import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { authJwt, verifySingup } from "../middlewares";
const router = Router();

router.post(
  "/",
  [authJwt.veriryToken, authJwt.isAdmin, verifySingup.checRolesExisted],
  userCtrl.createUser
);
export default router;
