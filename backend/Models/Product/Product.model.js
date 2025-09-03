import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
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

const productsModel = mongoose.model('Product', productSchema);

export default productsModel;
