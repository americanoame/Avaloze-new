import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import productRouter from './routes/productRoutes.js'

dotenv.config();
mongoose
.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('connected to db');
})
.catch((err) => {
    console.log(err.message);
});


const app = express();
app.use('/api/products', productRouter);
// 2second when he user enter /api/seed the sseRouter will respond to it 
 

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`server at http://localhost:${port}`)
});