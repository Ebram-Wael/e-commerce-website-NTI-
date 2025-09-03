import connectDB from "../../utils/db";

const productSchema = new connectDB.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'out of stock'],
        default: 'available'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'users',
        required: true
    }
}, {
    timestamps: true 
});

const productsModel = connectDB.model('Product', productSchema);

export default User;
