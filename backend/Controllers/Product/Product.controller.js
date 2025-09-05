import usersModel from '../../Models/User/User.model.js'
import productModel from '../../Models/Product/Product.model.js'




export const addProduct = async (req, res) => {
    req.body.userId = req.userId;
   

    try {
            const newProduct = new productModel(req.body);
            const savedProduct = await newProduct.save();
            return res.status(201).json({
                        message: "Product added successfully",
                        product: savedProduct
                     });
        }
    catch(error)
    {
        return res.status(500).json({
                message: "Failed to add product",
                error: error.message
                });
    } 

}




const getAllProducts = async (req, res) => {

    try {
        const allProductsInfo = await productModel.populate('userId');
        return res.status(200).json({
                        message: "Products loaded successfully",
                        product: allProductsInfo
                     });

    }
    catch(error) {
        return res.status(500).json({
                message: "Failed to load products",
                error: error.message
                });
    }
    


}







