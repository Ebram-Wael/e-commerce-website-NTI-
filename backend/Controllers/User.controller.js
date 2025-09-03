import usersModel from '../Models/User/User.model'

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/**
 * Create a new user in the system
 * 
 * @function signUp
 * @author Hussien
 * @created 2025-09-03
 * @description This function creates a new user in the database after validation on email and password.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends JSON response with user data or errors {vaildation email or password} / {duplicate email}
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
 * update user in the system
 * 
 * @function updateUser
 * @author Hussien
 * @created 2025-09-03
 * @description This function updates user info.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends JSON response with user data(with message: user was edited successfully) or error(user not found or fail at all)
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