import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import validator from 'validator'
const userSchema = new mongoose.Schema({
  username: {
        type: String,
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
        maxLength: [20, 'password must be at most 20 characters'],
    },
    role: {
        type: String,
        enum: ["user", "admin", "sales-man"],
        default: "user",
    },



// cart: {
//   type: {
//     items: [
//       {
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product"
//         },
//         quantity: {
//           type: Number,
//           default: 1
//         }
//       }
//     ]
//   },
//   required: function () {
//     return this.role === "user";
//   },
//   _id: false, 
//   default: { items: [] }
// }

   cart: {
    items: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      qunatity: {
        type: Number,
        required: true
      }
    }]
    // default: {
    //   items: []
    // }
  }
}, {
    timestamps: true,
});

userSchema.pre('save', async function (){
   if (this.role === "admin") {
    this.cart = undefined; 
  }
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    
})

const User = mongoose.model("User", userSchema);





export default User;