const express = require('express');
const db = require('./db');
const app = express();
const port = 5001;

db.connect();

app.use(express.json());

app.get('/ping', (req, res) => {
    console.log('I got ping!');
    res.send('shimi tavori');
});

app.use('/products', require('./routes/productsRoutes'));

app.listen(port, () => {
    console.log('listen to port', port);
});