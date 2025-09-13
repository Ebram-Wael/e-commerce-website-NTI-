import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "out of stock"],
      default: "available",
    },
    quantityInStore: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    userReference: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',
        required: true
    },
    categoryReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }


}, {
    timestamps: true 
});


productSchema.pre("save", function (next) {
  if (this.quantityInStore === 0) {
    this.status = "out of stock";
  } else {
    this.status = "available";
  }
  next();
});

productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.quantityInStore !== undefined) {
    if (update.quantityInStore === 0) {
      update.status = "out of stock";
    } else {
      update.status = "available";
    }
    this.setUpdate(update);
  }
  next();
});



const productsModel = mongoose.models.Product || mongoose.model('Product', productSchema);

export default productsModel;
