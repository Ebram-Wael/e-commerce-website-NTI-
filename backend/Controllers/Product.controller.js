import Product from "../Models/Product.model.js";
import cloudinary from "../utils/cloudinary.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, quantityInStore, image } = req.body;

    if (!title || !description || !price || !quantityInStore || !image) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    const result = await cloudinary.uploader.upload(image, { folder: "products" });

    const product = new Product({
      title,
      description,
      price,
      quantityInStore,
      imageUrl: result.secure_url,
      imageId: result.public_id,
      userId: req.userId,
    });

    await product.save();

    res.status(201).json({ status: "success", data: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to create product", error: error.message });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const allProductsInfo = await Product.find().populate("userId", "username email");
    res.status(200).json({ message: "Products loaded successfully", data: allProductsInfo });
  } catch (error) {
    res.status(500).json({ message: "Failed to load products", error: error.message });
  }
};

// Get Product by ID
export const getProductByID = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("userId", "username email");

    if (!product) return res.status(404).json({ status: "fail", message: "Product not found" });

    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to get product", error: error.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, quantityInStore, image } = req.body;
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ status: "fail", message: "Product not found" });

    if (image) {
      if (product.imageId) await cloudinary.uploader.destroy(product.imageId);

      const result = await cloudinary.uploader.upload(image, { folder: "products" });
      product.imageUrl = result.secure_url;
      product.imageId = result.public_id;
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.quantityInStore = quantityInStore ?? product.quantityInStore;

    await product.save();
    product = await Product.findById(req.params.id).populate("userId", "username email");

    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to update product", error: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.imageId) await cloudinary.uploader.destroy(product.imageId);

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};
