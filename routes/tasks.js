require("dotenv").config()
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../db');
const auth = require("../middleware/auth");


// Get all posts made by all users for feed
router.get('/', async (req, res) => {
    try {
        const tasks = await db.query('select * from tasks natural join credentials WHERE tasks.private_goal != 1 order by tid desc;');
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

// Get post corresponding to task id
router.get('/details/:tid', async (req, res) => {
    try {
        const tasks = await db.query('select * from tasks natural join credentials WHERE tid = $1', [req.params.tid]);
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
    
    start_date = new Date();
    var dd = start_date.getDate();
    var mm = start_date.getMonth() + 1;
    var yyyy = start_date.getFullYear();
    if(dd<10) 
    {
      dd='0'+dd;
    } 
    if(mm<10) 
    {
      mm='0'+mm;
    } 
    start_date = dd+ "-" + mm + "-" +yyyy
    console.log(dd+ "-" + mm + "-" +yyyy)
    // start_date = "02-02-2021"
    // start_date = 
    try {
        const results = await db.query(`insert into tasks (uid, task_name, body, isRecurring, frequency, 
                        end_date, private_goal, category, task_thumbnail, start_date) values ($1, $2, $3, $4, $5, 
                            TO_DATE($6, 'DD/MM/YYYY'), $7, $8, $9, $10) returning *`, 
                        [req.user.id, req.body.task_name, req.body.body, req.body.isRecurring, req.body.frequency, 
                         req.body.end_date, req.body.private_goal, req.body.category, req.body.task_thumbnail
                        , start_date]); 
        console.log("Back end")
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

// Pat a post
router.put('/pat/:tid', auth, async (req, res) => {

    
    try {
            const oldTask = await db.query('select (pats) from tasks where tid=$1', [req.params.tid])
            pats = parseInt(oldTask.rows[0].pats)

            pats = req.body.upvote ? pats +1 : pats-1;
            if(pats < 0)
                pats = 0
            const results = await db.query('update tasks set pats=$1 where tid=$2 returning *', [pats, req.params.tid])
            // const res = await db.query('update ')
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