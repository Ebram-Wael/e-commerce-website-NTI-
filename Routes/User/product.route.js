const express = require("express");
const router = express.Router();

const { auth } = require("../Middleware/authentication")
const { restrictTo } = require("../../Middleware/authorization");
const {
    getProductByID,
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
} = require("../../Controllers/Product/Product.controller");


router.use(auth);

router.get('/', getAllProducts);
router.get('/:id', getProductByID)

router.post('/', restrictTo("admin"), createProduct)
router.patch('/:id', restrictTo("admin"), updateProduct)
router.delete('/:id', restrictTo("admin"), deleteProduct)

