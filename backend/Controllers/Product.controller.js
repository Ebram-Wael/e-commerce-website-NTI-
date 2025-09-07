// controllers/product.controller.js

import Product from "../Models/Product.model.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, quantityInStore } = req.body;

    const product = new Product({
      title,
      description,
      price,
      quantityInStore: quantityInStore || 0,
      imageUrl: req.file ? req.file.path : undefined,
      userId: req.userId,
    });

    await product.save();

    res.status(201).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const allProductsInfo = await Product.find().populate(
      "userId",
      "username email"
    );
    res.status(200).json({
      message: "Products loaded successfully",
      products: allProductsInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load products",
      error: error.message,
    });
  }
};

// Get Product by ID
export const getProductByID = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "userId",
      "username email"
    );

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to get product",
      error: error.message,
    });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    if (req.file) {
      product.imageUrl = req.file.path;
      await product.save();
    }

    product = await Product.findById(req.params.id).populate(
      "userId",
      "username email"
    );

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: "fail", error: error.message });
  }
};
