import Order from "../Models/Order.model.js";
import usersModel from "../Models/User.model.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { address, paymentMethod } = req.body;

    // 1️⃣ جلب المستخدم مع الكارت
    const user = await usersModel.findById(req.userId).populate("cart.items.productId");

    if (!user || !user.cart.items.length) {
      return res.status(400).json({
        status: "error",
        message: "Cart is empty",
      });
    }

    // 2️⃣ تجهيز المنتجات من الكارت
    const products = user.cart.items.map(item => ({
      productId: item.productId._id,
      name: item.productId.name,
      quantity: item.quantity,
      price: item.price
    }));

    const totalPrice = user.cart.totalPrice;

    // 3️⃣ إنشاء الأوردر
    const order = new Order({
      user: {
        userId: user._id,
        username: user.username,
      },
      products,
      totalPrice,
      address,
      paymentMethod,
      status: "pending", // default
    });

    await order.save();

    // 4️⃣ فض الكارت
    await user.clearCart();

    res.status(201).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Get All Orders
export const getAllOrders = async (req, res) => {
  try {
    let filter = {};

    if (req.role !== "admin") {
      filter = { "user.userId": req.userId };
    }

    const allOrders = await Order.find(filter).populate("user.userId", "username email");

    res.status(200).json({
      status: "success",
      data: allOrders,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to get orders",
      error: error.message,
    });
  }
};

// Get Order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user.userId", "username email");

    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }

    if (req.role !== "admin" && order.user.userId.toString() !== req.userId) {
      return res.status(403).json({
        status: "fail",
        message: "You are not allowed to see this order",
      });
    }

    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to get order",
      error: error.message,
    });
  }
};

// Update Order
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    let order = await Order.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update order",
      error: error.message,
    });
  }
};

// Delete Order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }

    res.status(204).json();
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Failed to delete order",
      error: error.message,
    });
  }
};
