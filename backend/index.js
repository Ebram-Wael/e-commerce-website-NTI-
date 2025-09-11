import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import cors from "cors";
import usersRoutes from "./Routes/user.route.js";
import productRoutes from "./Routes/product.route.js";
import orderRoutes from "./Routes/order.route.js";


const app = express();
dotenv.config();


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('hello world');
});

app.use("/orders", orderRoutes);
app.use("/users", usersRoutes);
app.use("/products", productRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
