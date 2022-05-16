const express = require("express")
const cors = require("cors")

const { getDb, connectToDb } = require('./db')
const { ObjectId } = require('mongodb')

require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors());

// setting up routes
// app.use(require("./Routes/Users"));

// db connection
let db

connectToDb((err) => {
    if (!err) {
        app.listen(process.env.PORT, () => {
            console.log(`app listening on port ${process.env.PORT}`)
        })

        db = getDb()
    } else {
        console.log('error connecting to database: ' + err)
    }

})

// Routes

app.get('/users', (req, res) => {
    // fetches all users from database
    // const page = req.query.p || 0
    // const usersPerPage = 3

    let users = []

    db.collection('users')
        .find()
        .sort({ author: 1 })
        // .skip(page * usersPerPage)
        // .limit(usersPerPage)
        .forEach(user => users.push(user))
        .then(() => {
            console.log(users)
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the documents' })
        })
})