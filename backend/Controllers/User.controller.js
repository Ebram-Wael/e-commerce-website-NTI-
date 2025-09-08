import usersModel from "../Models/User.model.js";
import productModel from "../Models/Product.model.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import promisify from "util";
import { makeToken, makeRefreshToken } from "../utils/token.js";

// Badr Ahmed
/**
 * Register a new user (self-registration)
 *
 * @function signUp
 * @author Hussien
 * @created 2025-09-03
 * @description Creates a new user account in the system after validating email and password.
 *              - Regular users can self-register.
 *              - Sales-man cannot self-register (must be created by an Admin).
 *              - Admins can register themselves.
 *
 * @param {Object} req - Express request object containing user data in req.body
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with user data or error details
 *
 * @response {201} Created - User created successfully with new user data.
 * @response {400} Bad Request - Validation error on email or password.
 * @response {400} Bad Request - Duplicate email detected.
 * @response {401} Unauthorized - Sales-man attempted self-registration.
 */

export const signUp = async (req, res) => {
  let user = req.body;
  if (req.body.role === "sales-man") {
    return res
      .status(401)
      .json({ message: "unauthorized to make account so ask admin" });
  }
  if (req.body.role === "sales-man--") {
    req.body.role = "sales-man";
  }

  try {
    let newUser = await usersModel.create(user);
    res.status(201).json({ message: "Success", data: newUser });
  } catch (error) {
    let errors = {};

    // for email / password
    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((field) => {
        errors[field] = error.errors[field].message;
      });
    }

    // duplicate email
    if (error.code === 11000) {
      errors.email = "Email already exists";
    }

    res.status(400).json({ message: "fail", errors });
  }
};

/**
 * Update an existing user
 *
 * @author Hussien
 * @function updateUser
 * @description Updates user information (name, email, password, etc.) by user ID.
 *              - Accessible to Admins (can update any user).
 *              - Accessible to Users (can only update their own profile, depending on middleware).
 *
 * @param {Object} req - Express request object with user data in req.body and user ID in req.params.id
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with updated user data or error message
 *
 * @response {201} Success - User updated successfully.
 * @response {404} Not Found - User with the given ID does not exist.
 * @response {500} Internal Server Error - Unexpected server error.
 */

export const updateUser = async (req, res) => {
  let user = req.body;
  let { id } = req.params;

  try {
    let newUser = await usersModel.findByIdAndUpdate(
      id,
      { $set: user },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "user is Not Found" });

    res
      .status(201)
      .json({ message: "user was edited successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "fail" });
  }
};

/**
 * Delete an Admin account
 *
<<<<<<< HEAD
=======
 * @author Hussien
>>>>>>> hussien-updates
 * @function deleteAdmin
 * @description Deletes an admin user by ID and removes all products created by that admin.
 *              - Accessible only to Admins.
 *
 * @param {Object} req - Express request object with user ID in req.params.id
 * @param {Object} res - Express response object
 * @returns {Promise<void>} No content if successful
 *
 * @response {204} No Content - Admin and related products deleted successfully.
 * @response {404} Not Found - Admin with the given ID does not exist.
 * @response {500} Internal Server Error - Unexpected server error.
 */

export const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  let user = await usersModel.findByIdAndDelete(id);

  try {
    if (!user) {
      return res.status(404).json({ message: "User is Not Found" });
    }

    await productModel.deleteMany({ userId: id });

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

/**
 * Delete a Regular User account
 *
 * @author Hussien
 * @function deleteUser
 * @description Deletes a regular user account by ID.
 *              - Accessible only to Admins.
 *              - Does not delete products (since regular users don't own products in this design).
 *
 * @param {Object} req - Express request object with user ID in req.params.id
 * @param {Object} res - Express response object
 * @returns {Promise<void>} No content if successful
 *
 * @response {204} No Content - User deleted successfully.
 * @response {404} Not Found - User with the given ID does not exist.
 * @response {500} Internal Server Error - Unexpected server error.
 */

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await usersModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await usersModel.findByIdAndDelete(id);

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
};

/**
 * Create a new Sales-Man account (Admin only)
 *
 * @author Hussien
 * @function createSalesMan
 * @description Allows Admins to create sales-man accounts.
 *              Internally calls signUp() after forcing role = "sales-man".
 *
 * @param {Object} req - Express request object containing user data in req.body
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with created sales-man data
 *
 * @response {201} Created - Sales-man created successfully.
 * @response {403} Forbidden - Non-admin tried to create a sales-man.
 */

export const createSalesMan = async (req, res) => {
  req.body.role = "sales-man--";
  return signUp(req, res);
};

/**
 * User Login
 *
<<<<<<< HEAD
=======
 * @author Hussien
>>>>>>> hussien-updates
 * @function login
 * @description Authenticates a user with email and password.
 *              - Verifies credentials.
 *              - Generates an access token and a refresh token.
 *              - Saves the refresh token in the database.
 *
 * @param {Object} req - Express request object containing { email, password }
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with JWT tokens or error message
 *
 * @response {201} Success - Returns token and refresh token.
 * @response {400} Bad Request - Missing email or password.
 * @response {401} Unauthorized - Invalid email or password.
 * @response {404} Not Found - User not found.
 */

export const login = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "you must provide email and password",
    });
  }

  let user = await usersModel.findOne({ email: email });

  if (!user) {
    return res.status(404).json({
      message: "This User Not Found",
    });
  }
  let isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  let token = makeToken(user);
  let refreshToken = makeRefreshToken(user);

  await usersModel.findOneAndUpdate(
    { _id: user.id },
    { refreshToken: refreshToken }
  );

  res.status(201).json({
    message: "Success",
    token,
    refreshToken,
  });
};

/**
 * Refresh Access Token
 *
<<<<<<< HEAD
=======
 * @author Hussien
>>>>>>> hussien-updates
 * @function refreshToken
 * @description Validates the provided refresh token and issues a new access token.
 *              - Requires refresh token in req.body.
 *              - Checks against stored refresh token in DB for security.
 *
 * @param {Object} req - Express request object containing { refreshToken }
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with new access token
 *
 * @response {201} Success - New access token created.
 * @response {400} Bad Request - Refresh token not provided.
 * @response {403} Forbidden - Invalid or mismatched refresh token.
 */

export const refreshToken = async (req, res, next) => {
  let { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      message: "refreshToken is required",
    });
  }

  try {
    let decode = await promisify(jwt.verify)(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );

    let user = await usersModel.findOne({ _id: decode.id });

    if (!user || user.refreshToken != refreshToken) {
      return res.status(403).json({
        message: "isValid refreshToken",
      });
    } else {
      let token = makeToken(user);
      res.status(201).json({
        message: "Success",
        token,
      });
    }
  } catch (error) {
    res.status(403).json({
      message: "Bad Request",
    });
  }
};



/**
 * Get User Cart
 *
 * @author Hussien
 * @function getCart
 * @description Retrieves the current user's cart with populated product details.
 *              - Requires authenticated user (`req.user`).
 *              - Populates `cart.items.productId` with product info.
 *
 * @param {Object} req - Express request object with authenticated user in `req.user`.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} JSON response with the user's cart (products & total price).
 *
 * @response {200} Success - Cart retrieved successfully.
 * @response {500} Internal Server Error - Failed to retrieve cart.
 */

export const getCart = async(req, res) => {
  

  try{
    const user  = await req.user.populate('cart.items.productId');
  
  let products = user.cart.items;
  let totalPrice = user.cart.totalPrice;

  const uploadedCart = {
    products,
    totalPrice
  }

  return res.status(200).json({ message: "Cart Uploaded Successfully", data: uploadedCart });

  }


  catch(error){
    return res.status(500).json({
      message:"Failed To Upload Cart Some Error Happen"
    })

  }
    
    }
     




    /**
 * Add Product to Cart
 *
 * @author Hussien
 * @function addProductToCart
 * @description Adds a product to the authenticated user's cart.
 *              - Requires `productId` in `req.body`.
 *              - If product exists in cart, increments its quantity and adjust price of product based on its quantity.
 *              - Recalculates total price after addition.
 *
 * @param {Object} req - Express request object containing { productId } in body.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} JSON response with updated user document (cart).
 *
 * @response {200} Success - Product added to cart successfully.
 * @response {500} Internal Server Error - Failed to add product to cart.
 */
export const addProductToCart = async(req, res) => {
  
  
   try{
    const prodId = req.body.productId;

  const product = await productModel.findById(prodId);

  const result = await req.user.addToCart(product);
  return res.status(200).json({ message: "Product Added To Cart Successfully", data: result });




   }
    catch(error){
    return res.status(500).json({
      message:"Failed To Add Product To Cart Some Error Happen"
    })

  }

};






/**
 * Delete Product from Cart
 * 
 * @author Hussien
 * @function deleteProductFromCart
 * @description Removes a specific product from the authenticated user's cart.
 *              - Requires `productId` in `req.body`.
 *              - Recalculates total price after removal.
 *
 * @param {Object} req - Express request object containing { productId } in body.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} JSON response with updated user document (cart).
 *
 * @response {200} Success - Product removed from cart successfully.
 * @response {500} Internal Server Error - Failed to remove product from cart.
 */

export const deleteProductFromCart = async(req, res, next) => {
  const prodId = req.body.productId;

 
  try{

  const result =  await req.user.removeFromCart(prodId);
  return res.status(200).json({ message: "Remove Product From Cart Successfully", data: result });

  }
   catch(error){
    return res.status(500).json({
      message:"Failed To Remove from Cart Some Error Happen"
    })

  }

 
    
};
