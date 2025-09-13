import Category from "../Models/Category.model.js";
import Product from "../Models/Product.model.js";


/**
 * @author Hussien
 * @function createCategory
 * @desc    Create a new category
 * @route   POST http://localhost:3000/category/
 * @access  Private (admin only)
 * @body    { name: String, description: String }
 * @returns {Object} Created category
 */
export const createCategory = async (req, res) => {
    try {
        const categoryData = req.body;
        const category = await Category.create(categoryData);
        res.status(201).json({
            status: "success",
            data: category
        });
    }

    catch (error) {
    res.status(500).json({
       message: "failed to create category",
      error: error.message
 
      });
  }
}

/**
 * @author Hussien
 * @function searchByCategory
 * @desc    Find products by category name
 * @route   POST /http://localhost:3000/category/search
 * @access  Private (user & admin)
 * @body    { name: String }
 * @returns {Object[]} Array of products under the given category
 */
export const searchByCategory = async (req, res) => {
    try {
        const categoryName = req.body.name.toUpperCase();
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return res.status(404).json({
                status: "fail",
                message: "Category not found"
            });
        }
        const products = await Product.find({ categoryReference: category._id })
        .populate(
            "userReference",
            "username email"
        ).populate(
            "categoryReference", "name description"
        );
        res.status(200).json({
            status: "success",
            results: products.length,
            data: products
        });
    }
    catch (error) {
    res.status(500).json({
       message: "failed to search by category",
      error: error.message
 
      });
  }
}








