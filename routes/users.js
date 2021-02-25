require("dotenv").config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const db = require('../db');

router.post('/', [
    check('user_name', 'User name is required').not().isEmpty(),
    check('user_name', 'User name should have a maximum of 25 characters').isLength({ max: 25}),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6})
],
async (req, res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { user_name, password } = req.body;

    try {
        let user = await db.query('select * from credentials where user_name=$1', [user_name]);
        // console.log(user);
        if(user.rows.length > 0) {
            return res.status(400).json({ errors: [{ msg: "User already exists"}]})
        }

        const salt = await bcrypt.genSalt(10);

        password = await bcrypt.hash(password, salt);

        user = await db.query('insert into credentials (user_name, password) values ($1, $2) returning *', [user_name, password])

        // console.log(user)
        const payload = {
            user: {
                id: user.rows[0].uid,
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: 360000},
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        )
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
}
)

module.exports = router;


