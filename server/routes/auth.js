const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');
const jwtGenerators = require('../helpers/jwtGenerator');
const authorize = require('../middleware/authorize');
const validInfo = require('../middleware/validInfo');

router.post("/register", validInfo, async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query("select * from users where email = $1", [email]);
        if (user.rows.length) return res.status(401).json("User already exist!");

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
        // TODO
        const newUser = await pool.query("insert into users() values ()")
    } catch (error) {

    }
});

router.post("/login", validInfo, async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query("select * from users where email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const isPasswordValid = bcrypt.compare(password, user.rows[0].user_password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

        const jwtToken = jwtGenerators(user.rows[0].user_id);
        return res.json({ token: jwtToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.post("/verify", authorize, async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});