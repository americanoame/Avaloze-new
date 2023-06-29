import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

productRouter.get('/prod/:prod', async (req, res) => {
    const product = await Product.findOne({prod:req.params.prod});
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found'});
    }
    
});

productRouter.get('/:_id', async (req, res) => {
    const product = Product.findById(req.params._id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found'});
    }
    
});

export default productRouter;