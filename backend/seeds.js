import Product from './models/productModel.js';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose
.connect(process.env.MONGODB_URI)
.then (async() => {
    console.log('connected to db');
    await run();
    process.exit();
})
.catch((err) => {
    console.log(err.message);
});

async function run() {
    await Product.deleteMany({});  // pass parameter as a empty object thats mean return all the records inside the product model 
        const createdProducts = await Product.insertMany(data.products); // we called product insertMany to insert a array of product to the (Product) model
}


