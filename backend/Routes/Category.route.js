import express from "express";
import {
    createCategory,
    searchByCategory
} from "../Controllers/Category.controller.js";
const router = express.Router();
import { restrictTo } from "../Middleware/authorization.js";
import { auth } from "../Middleware/authentication.js";



/**
 * @author Hussien
 * @route POST http://localhost:3000/category/
 * @description Create a new category
 * @access Private (admin only)
 */
router.post("/", auth, restrictTo("admin"), createCategory);

/**
 * @author Hussien
 * @route GET http://localhost:3000/category/search
 * @description Search for products by category name
 * @access user & admin
 */
router.get("/search", auth, restrictTo("user", "admin"), searchByCategory);

export default router;
