import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "credit card", "paypal"],
      default: "cash",
    },
    status: {
      type: String,
      enum: ["pending", "received", "shipped", "canceled"],
      default: "pending",
    },
    user: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);


orderSchema.pre("save", function (next) {
  if (!this.status) {
    this.status = "pending";
  }
  next();
});


orderSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.status !== undefined) {
    const validStatuses = ["pending", "received", "shipped", "canceled"];
    if (!validStatuses.includes(update.status)) {
      update.status = "pending";
    }
    this.setUpdate(update);
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
