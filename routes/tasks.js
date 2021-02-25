require("dotenv").config()
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../db');
const auth = require("../middleware/auth");


// Get all posts made by all users for feed
router.get('/', async (req, res) => {
    try {
        const tasks = await db.query('select * from tasks');
        console.log(tasks.rows)
        res.json({
            status: "success",
            length: tasks.rows.length,
            data: {
                tasks: tasks.rows
            }
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error')
    }
})

// Get all posts made by one particular user
router.get('/:id', async (req, res) => {
    try {
        const tasks = await db.query('select * from tasks where uid=$1', [req.params.id]);
        // console.log(user.rows)
        res.json({
            status: "success",
            length: tasks.rows.length,
            data: {
                tasks: tasks.rows
            }
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error')
    }
})


module.exports = router