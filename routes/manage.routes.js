import { Router } from "express";
import {
  getOrder,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersPagination,
  getOrdersQuantity,
  getOrdersQuantity_withSearcher,
  getOrdersPagination_withSearcher,
} from "../controllers/orders.controllers.js";

import {
  getProducts,
  getProduct,
  createProducts,
  updateProducts,
  deleteProducts,
  getProductsPagination,
  getProductsQuantity,
  getProductsPagination_withSearcher,
  getProductsQuantity_withSearcher,
} from "../controllers/products.controllers.js";

import {
  createProductsSummary,
  deleteProductsSummary,
  getProductSummary,
  updateProductsSummary,
} from "../controllers/productsSummary.controllers.js";

const router = Router();

//Routes for orders
router.get("/ordersquantity", getOrdersQuantity);

router.get("/ordersquantity/:set_searcher", getOrdersQuantity_withSearcher);

router.get("/orders", getOrders);

router.get(
  "/orderspagination/:set_searcher_by&:set_searcher_by_ad&:initial_post&:post_per_page",
  getOrdersPagination
);

router.get(
  "/orderspaginationsearcher/:set_searcher&:set_searcher_by&:set_searcher_by_ad&:initial_post&:post_per_page",
  getOrdersPagination_withSearcher
);

router.get("/orders/:id", getOrder);

router.post("/orders", createOrder);

router.put("/orders/:id", updateOrder);

router.delete("/orders/:id", deleteOrder);

//Routes for products
router.get("/productsquantity", getProductsQuantity);

router.get("/productsquantity/:set_searcher", getProductsQuantity_withSearcher);

router.get("/products", getProducts);

router.get(
  "/productspagination/:set_searcher_by&:set_searcher_by_ad&:initial_post&:post_per_page",
  getProductsPagination
);

router.get(
  "/productspaginationsearcher/:set_searcher&:set_searcher_by&:set_searcher_by_ad&:initial_post&:post_per_page",
  getProductsPagination_withSearcher
);

router.get("/products/:id", getProduct);

router.post("/products", createProducts);

router.put("/products/:id", updateProducts);

router.delete("/products/:id", deleteProducts);

//Routes for orders summarize
router.get("/sum/:id", getProductSummary);

router.post("/sum", createProductsSummary);

router.put("/sum/:id", updateProductsSummary);

router.delete("/sum/:id", deleteProductsSummary);

export default router;
