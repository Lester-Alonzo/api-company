import { Router } from "express";
import { authJwt } from "../middlewares";
const router = Router();
import * as productsCtrl from "../controllers/products.controller";

router.get("/", productsCtrl.getProducts);
router.post(
  "/",
  [authJwt.veriryToken, authJwt.isModerator],
  productsCtrl.createProduct
);
router.get("/:productId", productsCtrl.getProductById);
router.put(
  "/:productId",
  [authJwt.veriryToken, authJwt.isAdmin],
  productsCtrl.updateProductById
);
router.delete(
  "/:productId",
  [authJwt.veriryToken, authJwt.isAdmin],
  productsCtrl.deleteProductById
);

export default router;
