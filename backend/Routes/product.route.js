/**
 * @author Eslam
 */
import express from "express";

import {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../Controllers/Product.controller.js";
import { restrictTo } from "../Middleware/authorization.js";
import { auth } from "../Middleware/authentication.js";
const router = express.Router();
// Apply authentication middleware for all product routes
router.use(auth);

/**
 * @route GET http://localhost:3000/products
 * @description Get all products
 * @access Authenticated users
 */
router.get("/", getAllProducts);

/**
 * @route GET http://localhost:3000/products/:id
 * @description Get a product by ID
 * @access Authenticated users
 */
router.get("/:id", getProductByID);

/**
 * @route POST http://localhost:3000/products
 * @description Create a new product
 * @access Admin only
 */
router.post("/", restrictTo("admin"), createProduct);

/**
 * @route PATCH http://localhost:3000/products/:id
 * @description Update a product by ID
 * @access Admin only
 */
router.patch("/:id", restrictTo("admin"), updateProduct);

/**
 * @route DELETE http://localhost:3000/products/:id
 * @description Delete a product by ID
 * @access Admin only
 */
router.delete("/:id", restrictTo("admin"), deleteProduct);

export default router;
