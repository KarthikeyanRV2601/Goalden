require("dotenv").config()
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../db');
const auth = require("../middleware/auth");

// Add an update to a post
router.post('/:id', auth, async (req, res) => {
    
    try {

        const results = await db.query(`insert into calender (tid,update_thumbnail, body) 
                    values ($1, $2, $3) returning *`, 
                        [req.params.id,req.body.update_thumbnail, req.body.body]); 
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

//Get all updates of a task 
router.get('/:id', auth, async (req, res) => {
    try {
        const update = await db.query('select * from calender where tid=$1', [req.params.id]);
        // console.log(user.rows)
        res.json({
            status: "success",
            length: update.rows.length,
            data: {
                update: update.rows
            }
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error')
    }
})

//Check if post is the current logged in user's or not 
router.get('/mine/:id', auth, async (req, res) => {

    try {
        const update = await db.query('select uid from tasks where tid=$1', [req.params.id]);
        
        // if (update.rows[0])
        if(update.rows[0].uid == req.user.id)
            res.json({
                status: "success",
                length: update.rows.length,
                mine: 1
            })
        else
            res.json({
                status: "success",
                length: update.rows.length,
                mine: 0
            })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error')
    }
})


module.exports = router