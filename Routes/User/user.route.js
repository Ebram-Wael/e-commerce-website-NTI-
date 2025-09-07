import express from 'express'
import { signUp, updateUser, deleteAdmin, deleteUser,  createSalesMan, login, refreshToken} from '../../Controllers/User/User.controller.js';
const router = express.Router();
import {restrictTo} from '../../Middleware/authorization.js'
import {auth} from '../../Middleware/authentication.js'






/**
 * @author Hussien
 * @route POST http://localhost:3000/users/createStranger
 * @description Admin creates a Stranger account (sales-man)
 * @access Admin
 */
router.post('/createStranger', auth, restrictTo('admin'), createSalesMan);




/**
 * @author Hussien
 * @route POST http://localhost:3000/users/login
 * @description User login
 * @access Public
 */

router.post('/login',login);




/**
 * @author Hussien
 * @route POST http://localhost:3000/users/refreshToken
 * @description Refresh JWT access token
 * @access Public
 */

router.post('/refreshToken',refreshToken);





/**
 * @author Hussien
 * @route DELETE http://localhost:3000/users/admin/:id
 * @description Delete an Admin and their products
 * @access Admin
 */
router.delete('/admin/:id', auth, restrictTo('admin'),deleteAdmin);





/**
 * @author Hussien
 * @route DELETE http://localhost:3000/users/:id
 * @description Delete a regular user
 * @access Admin
 */
router.delete('/:id', auth, restrictTo('admin'),deleteUser);






/**
 * @author Hussien
 * @route PATCH http://localhost:3000/users/:id
 * @description Update user information
 * @access User/Admin
 */
router.patch('/:id', auth, restrictTo('user', 'admin'), updateUser);







/**
 * @author Hussien
 * @route POST http://localhost:3000/users
 * @description User/Admin registration (Sales-man blocked)
 * @access Public
 */
router.post('/', signUp);

export default router;