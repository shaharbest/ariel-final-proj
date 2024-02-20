const db = require('./db');
const Product = require('./models/Product');

const sampleProducts = [
    { id: '101', name: 'banana', price: 42 },
    { id: '102', name: 'apple', price: 13 },
    { id: '103', name: 'nuclear missle', price: 25 },
];

main();

async function main() {
    db.connect();

    console.log('deleting all products...');
    await Product.deleteMany();
    console.log('complete!');

    console.log('inserting products...');
    await Product.insertMany(sampleProducts);
    console.log('complete!');

    db.disconnect();
}