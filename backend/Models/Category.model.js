import mongoose from 'mongoose';
const Schema = mongoose.Schema;






/**
 * Category Schema
 * ----------------
 * Fields:
 * - name: category name (stored in uppercase, unique)
 * - description: short description of the category
 *
 * Notes:
 * - The `set` function ensures that every category name is stored in uppercase
 *   (avoids duplicates like "electronics" vs "ELECTRONICS").
 * - `timestamps: true` automatically adds createdAt and updatedAt.
 */
const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        set: v => v.toUpperCase()
    },

    description: {
        type: String,
        required: true
    }


}, { timestamps: true });


const CategoryModel =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
export default CategoryModel;