const cors = require("cors")
const express = require('express')
// const db = require("./db")
const app = express()
const path = require('path');


app.use(express.json({ extended: false }))
app.use(cors())


app.get('/', (req, res) => {
    res.send('API running');
    console.log("eeee")
})
    

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/update', require('./routes/update'));

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})



