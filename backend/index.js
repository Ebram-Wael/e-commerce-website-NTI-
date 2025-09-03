import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';


const app = express();
dotenv.config();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});