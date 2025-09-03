import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';

import mongoose from 'mongoose';

import usersRoutes from './Routes/User/user.route.js'


const app = express();
dotenv.config();

app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('hello world');
// });

app.use('/users',usersRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
