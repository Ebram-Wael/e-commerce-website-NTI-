import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        enum: ["user", "admin"],
        default: "user",
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

userSchema.pre('save', async function (){
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    
})



export default User;