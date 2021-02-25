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

// Add a task
router.post('/', auth, async (req, res) => {
    
    if(!("frequency" in req.body))
        req.body.frequency = null

    if(!("end_date" in req.body))
        req.body.end_date = null

    if(!("task_thumbnail" in req.body))
        req.body.task_thumbnail = null
    
    try {
        const results = await db.query(`insert into tasks (uid, task_name, body, isRecurring, frequency, 
                        end_date, private_goal, category, task_thumbnail) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`, 
                        [req.user.id, req.body.task_name, req.body.body, req.body.isRecurring, req.body.frequency, 
                         req.body.end_date, req.body.private_goal, req.body.category, req.body.task_thumbnail]); 
        res.json({
            status: "success",
            results: results.rows.length,
            data: {
                results: results.rows
            }
        })
    } catch (error) {
        console.log(error)
    }
});


module.exports = router