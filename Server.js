
// Require packages
const express = require('express')
const mongoose = require('mongoose')

const router = require('express').Router()
let User = require("./models/User")

// Configure dotenv
require('dotenv').config()

const DB_connect = async() => {
    try {
        let response = mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true ,
             useUnifiedTopology: true,
        })
    console.log('DB connected ... :) ')
    } catch (err) {
        console.log(err)
    }
} 

const app = express()

// connecting to the DB
DB_connect()

// Creating the routes
  // ************* //
  
// RETURN ALL USERS 
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// ADD A NEW USER TO THE DATABASE
router.route('/add').post((req, res) => {
    const userName = req.body.userName
    const newUser = new User({userName})

    newUser.save()
           .then(() => res.json('User added successfully!'))
           .catch(err => res.status(400).json(`Error: ${err}`))
})

// EDIT A USER BY ID 
router.route('/update/:id').put((req, res) => {
    let updatedUser = User.findByIdAndUpdate({_id: req.params.id}, { $set: {...req.body}})
     updatedUser.save()
                .then(() => res.json('User updated successfully... :)'))
                .catch(err => res.status(400).json(`Error: ${err}`)) 
})

// REMOVE A USER BY ID
router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete({_id: req.params.id})
        .then(() => res.json('User deleted successfully! :)'))
        .catch(err => res.status(400).json(`Error: ${err}`))
})


// Listening to the PORT
app.listen(process.env.PORT, (err) => {
    if (err)
        console.error(err)
    console.log('server is running... :)')
})


module.exports = router