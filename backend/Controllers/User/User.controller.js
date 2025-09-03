import usersModel from '../../Models/User/User.model.js'
import productModel from '../../Models/Product/Product.model.js'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


/**
 * Create a new user in the system
 * 
 * @function signUp
 * @author Hussien
 * @created 2025-09-03
 * @description This function creates a new user in the database after validating email and password.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends JSON response
 * 
 * @response {201} Created - User created successfully with new user data.
 * @response {400} Bad Request - Validation error on email or password.
 * @response {400} Bad Request - Duplicate email detected.
 */
export const signUp = async (req, res) => {
     let user = req.body;
     

    try {
    let newUser = await usersModel.create(user);
    res.status(201).json({ message: 'Success', data: newUser });
    }

    catch(error) {
     let errors = {};

    // for email / password 
    if (error.name === 'ValidationError') {
      Object.keys(error.errors).forEach((field) => {
        errors[field] = error.errors[field].message;
      });
    }

    // duplicate email
    if (error.code === 11000) {
      errors.email = 'Email already exists';
    }

    res.status(400).json({ message: 'fail', errors });

    }

}




/**
 * Update an existing user in the system
 * 
 * @function updateUser
 * @author Hussien
 * @created 2025-09-03
 * @description This function updates user information based on the provided ID.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends JSON response
 * 
 * @response {201} Created - User updated successfully with updated user data.
 * @response {404} Not Found - User with the given ID was not found.
 * @response {500} Internal Server Error - Unexpected error while updating user.
 */
export const updateUser = async (req, res) => {
    let user = req.body;
    let {id} = req.params;
    
    try {
        let newUser = await usersModel.findByIdAndUpdate(id, {$set : user}, {new: true});

    if (!user) return res.status(404).json({ message: 'user is Not Found' });

     res.status(201).json({ message: 'user was edited successfully', data: newUser });


    }   
    catch(error)
    {
    res.status(500).json({ message: 'fail' });


    }
}



/**
 * Delete an admin user from the system
 *
 * @function deleteAdmin
 * @author Hussien
 * @created 2025-09-03
 * @description This function deletes an admin by ID and removes their products.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends JSON response
 *
 * @response {204} No Content - Admin and related products deleted successfully.
 * @response {404} Not Found - Admin with given ID does not exist.
 * @response {500} Internal Server Error - Something went wrong on the server.
 */
export const deleteAdmin = async (req, res) => {
     const {id} = req.params;
    let user = await usersModel.findByIdAndDelete(id);



    try{
      if(!user)
        {
            return res.status(404).json({ message: 'User is Not Found' });

        }

        await productModel.deleteMany({ userId: id});
    
    res.status(204).json();
    }
    catch(error)
    {
        res.status(500).json({ message: 'Error' });
    }
    

    


}



/**
 * Delete a regular user from the system
 *
 * @function deleteUser
 * @author Hussien
 * @created 2025-09-03
 * @description This function deletes a user by ID only if the role is "user".
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends JSON response
 *
 * @response {204} No Content - User deleted successfully.
 * @response {404} Not Found - User with the given ID does not exist.
 * @response {500} Internal Server Error - Unexpected error occurred.
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




