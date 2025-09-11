import express from "express";
import {
  signUp,
  updateUser,
  deleteAdmin,
  deleteUser,
  createSalesMan,
  login,
  refreshToken,
  getCart,
  addProductToCart,
  deleteProductFromCart,
  getMe,
} from "../Controllers/User.controller.js";
const router = express.Router();
import { restrictTo } from "../Middleware/authorization.js";
import { auth } from "../Middleware/authentication.js";



/**
 * @author Hussien
 * @route GET http://localhost:3000/users/cart
 * @description Get the authenticated user's cart (products & total price).
 * @access User
 */
router.get("/cart", auth, restrictTo("user"), getCart);






/**
 * @author Hussien
 * @route POST http://localhost:3000/users/cart
 * @description Add a product to the authenticated user's cart.
 *              - Requires { productId } in request body.
 * @access User
 */

router.post("/cart", auth, restrictTo("user"), addProductToCart);





/**
 * @author Hussien
 * @route DELETE http://localhost:3000/cart
 * @description Remove a product from the authenticated user's cart.
 *              - Requires { productId } in request body.
 * @access User
 */

router.delete("/cart", auth, restrictTo("user"), deleteProductFromCart);

/**
 * @author Hussien
 * @route POST http://localhost:3000/users/createStranger
 * @description Admin creates a Stranger account (sales-man)
 * @access Admin
 */
router.post("/createStranger", auth, restrictTo("admin"), createSalesMan);

/**
 * @author Hussien
 * @route POST http://localhost:3000/users/login
 * @description User login
 * @access Public
 */

router.post("/login", login);

/**
 * @author Hussien
 * @route POST http://localhost:3000/users/refreshToken
 * @description Refresh JWT access token
 * @access Public
 */

router.post("/refreshToken", refreshToken);

/**
 * @author Hussien
 * @route DELETE http://localhost:3000/users/admin/:id
 * @description Delete an Admin and their products
 * @access Admin
 */
router.delete("/admin/:id", auth, restrictTo("admin"), deleteAdmin);

/**
 * @author Hussien
 * @route DELETE http://localhost:3000/users/:id
 * @description Delete a regular user
 * @access Admin
 */
router.delete("/:id", auth, restrictTo("admin"), deleteUser);

/**
 * @author Hussien
 * @route PATCH http://localhost:3000/users/:id
 * @description Update user information
 * @access User/Admin
 */
router.patch("/:id", auth, restrictTo("user", "admin"), updateUser);

/**
 * @author Hussien
 * @route POST http://localhost:3000/users
 * @description User/Admin registration (Sales-man blocked)
 * @access Public
 */
router.post("/signup", signUp);

/**
 * @author Hussien
 * @route GET http://localhost:3000/users/me
 * @description Get the authenticated user's information
 * @access User
 */
router.get("/me", auth, getMe);

export default router;
