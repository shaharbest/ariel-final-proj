const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    const allProducts = await Product.find();
    res.json(allProducts);
});

router.get('/:id', async (req, res) => {
    const givenID = req.params.id;
    const wantedProduct = await Product.findById(givenID);
    res.json(wantedProduct);
});

router.post('/', async (req, res) => {
    const newProduct = req.body;
    await Product.create(newProduct);
    res.send(`${newProduct.name} was created`);
});

router.delete('/:id', async (req, res) => {
    const givenID = req.params.id;
    await Product.findByIdAndDelete(givenID);
    res.send(`product with id ${givenID} was deleted`);
});


module.exports = router;