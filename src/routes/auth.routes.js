import { Router } from "express";
const router = Router();

import * as authCtlr from "../controllers/auth.controller";
import { verifySingup } from "../middlewares";

router.post("/signin", authCtlr.singIn);
router.post(
  "/sinup",
  [verifySingup.checDuplicatedUsernameOrEmail, verifySingup.checRolesExisted],
  authCtlr.singUp
);

export default router;
