const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    const allUsers = await User.find();
    res.json(allUsers);
});

router.get('/:id', async (req, res) => {
    const givenID = req.params.id;
    const wantedUser = await User.findById(givenID);
    res.json(wantedUser);
});

router.post('/', async (req, res) => {
    try {
        const givenPass = req.body.password;
        const hashedPass = await bcrypt.hash(givenPass, 10);

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
        };

        await User.create(newUser);
        res.sendStatus(201);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) return res.status(400).send('unknown email');

		const hashedSaltedPass = user.password;
		const givenPass = req.body.password;

		if (await bcrypt.compare(givenPass, hashedSaltedPass)) {
            const token = jwt.sign({ name: user.name }, '123');
			res.json({ token });
        }
		else
			res.status(401).send('not allowed');
	}
	catch {
		res.status(500).send('server error');
	}
});

router.post('/whoami', async (req, res) => {
    const token = req.body.token;
    const user = jwt.verify(token, '123');
    res.send(user.name);
});


router.delete('/:id', async (req, res) => {
    const givenID = req.params.id;
    await User.findByIdAndDelete(givenID);
    res.send(`user with id ${givenID} was deleted`);
});


module.exports = router;