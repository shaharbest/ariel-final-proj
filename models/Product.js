const mongoose = require('mongoose');

const productScheme = new mongoose.Schema({
    name: String,
    price: Number,
});

module.exports = mongoose.model('product', productScheme);