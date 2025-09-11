
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import validator from 'validator'

/**
 * @author Hussien
 * User Model
 *
 * @module models/User
 * @description Defines the User schema and model with authentication, roles, and cart functionality.
 */



/**
 * @typedef User
 * @property {string} username - Unique username of the user.
 * @property {string} email - Unique email address of the user.
 * @property {string} password - Hashed password of the user.
 * @property {string} role - Role of the user: "user" | "admin" | "sales-man".
 * @property {string} phoneNumber - Optional phone number.
 * @property {Cart} cart - Cart containing products (not available for admin/sales-man).
 */

/**
 * @typedef Cart
 * @property {CartItem[]} items - Array of items in the cart.
 * @property {number} totalPrice - Total cost of all items in the cart.
 */

/**
 * @typedef CartItem
 * @property {mongoose.Types.ObjectId} productId - Reference to a Product document.
 * @property {number} quantity - Number of items of the product in the cart.
 * @property {number} price - Price of the product at the time it was added to the cart.
 */



const userSchema = new mongoose.Schema({
  username: {
        type: String,
        unique: true,
        required: true,
    },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email",
      },

},
    password: {
        type: String,
        required: true,
        minLength: [10, 'password must be at least 10 characters'],
        maxLength: [255, 'password must be at most 255 characters'],
    },
    role: {
        type: String,
        enum: ["user", "admin", "sales-man"],
        default: "user",
    },

    phoneNumber: {
      type: String
    },


  //  cart: {
  //   items: [{
  //     productId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'Product',
  //       required: true
  //     },
  //     qunatity: {
  //       type: Number,
  //       required: true
  //     }
  //   }]
  //   // default: {
  //   //   items: []
  //   // }
  // }
    cart: {
      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      totalPrice: {
        type: Number,
        default: 0,
      },
    },
  
}, {
    timestamps: true,
});





/**
 * Pre-save middleware
 *
 * @author Hussien
 * @function
 * @description
 * - Removes cart for `admin` or `sales-man` roles.
 * - Hashes the password before saving.
 *
 * @private
 */
userSchema.pre('save', async function (){
   if (this.role === "admin" || this.role === "sales-man") {
    this.cart = undefined; 
  }
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    
})

/**
 * Add a product to the cart
 *
 * @author Hussien
 * @function addToCart
 * @memberof User
 * @instance
 * @description Adds a product to the user's cart.  
 * If the product already exists, increments its quantity.  
 * Recalculates total product's price based on newQuantity and the total cart price.
 *
 * @param {Object} product - Product object containing `_id` and `price`.
 * @returns {Promise<User>} Updated user document with updated cart.
 *
 * @example
 * const user = await User.findById(userId);
 * await user.addToCart(product);
 */

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex(
    (cp) => cp.productId.toString() === product._id.toString()
  );

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
      price: product.price * newQuantity,
    });
  }


  const updatedTotalPrice = updatedCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  this.cart = {
    items: updatedCartItems,
    totalPrice: updatedTotalPrice,
  };

  return this.save();
};



/**
 * Remove a product from the cart
 *
 * @author Hussien
 * @function removeFromCart
 * @memberof User
 * @instance
 * @description Removes a product with all its quantities from the cart by its ID and recalculates the total price.
 *
 * @param {mongoose.Types.ObjectId} productId - ID of the product to remove.
 * @returns {Promise<User>} Updated user document with updated cart.
 */

userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter(
    (item) => item.productId.toString() !== productId.toString()
  );

  const updatedTotalPrice = updatedCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  this.cart.items = updatedCartItems;
  this.cart.totalPrice = updatedTotalPrice;

  return this.save();
};






/**
 * Clear the cart
 *
 * @author Hussien
 * @function clearCart
 * @memberof User
 * @instance
 * @description Empties the cart and resets the total price to 0.
 *
 * @returns {Promise<User>} Updated user document with empty cart.
 */

userSchema.methods.clearCart = function () {
  this.cart = { items: [], totalPrice: 0 };
  return this.save();
};

const User = mongoose.model("User", userSchema);





export default User;