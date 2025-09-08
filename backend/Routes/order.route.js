/**
 * @author Ahmed
 */
import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../Controllers/Order.controller.js";
import { auth } from "../Middleware/authentication.js";
import { restrictTo } from "../Middleware/authorization.js";

const router = express.Router();

// Apply authentication middleware for all order routes
router.use(auth);

/**
 * @route GET http://localhost:3000/orders
 * @description Get all orders
 * @access Authenticated users (admin can see all, user sees only his)
 */
router.get("/", getAllOrders);

/**
 * @route GET http://localhost:3000/orders/:id
 * @description Get an order by ID
 * @access Authenticated users (user can only see his order, admin sees any)
 */
router.get("/:id", getOrderById);

/**
 * @route POST http://localhost:3000/orders
 * @description Create a new order
 * @access Authenticated users
 */
router.post("/", createOrder);

/**
 * @route PATCH http://localhost:3000/orders/:id
 * @description Update order status or details
 * @access Admin only
 */
router.patch("/:id", restrictTo("admin"), updateOrder);

/**
 * @route DELETE http://localhost:3000/orders/:id
 * @description Delete an order
 * @access Admin only
 */
router.delete("/:id", restrictTo("admin"), deleteOrder);

export default router;
