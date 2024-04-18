const express = require('express')
require('dotenv').config()
const port = process.env.PORT
const app = express()
const clients = require('./models/clients')
const colors = require('colors')
const morgan = require('morgan')
const { log } = require('console')

//middleware...
app.use(morgan('dev')) //Developer logger......
app.use(express.urlencoded({ extended: false }))

//Routes...
//Index Route...
app.get('/clients', (req, res) => {
    res.render('index.ejs', {
        individuals: clients
    })
})
//New route....
app.get('/clients/new', (req, res) => {
    res.render('new.ejs')
})

//POST route...
app.post('/clients', (req, res) => {
    if (req.body.medication === 'on') {
        req.body.medication = true
    } else {
        req.body.medication = false
    }
    console.log(req.body)
    clients.push(req.body)
    res.redirect('/clients')
})

//Show route....
app.get('/clients/:id', (req, res) => {
    res.render('show.ejs', {
        client: clients[req.params.id]
    })
})


//Listener
app.listen(port, () => {
    console.log(`Server is running on ${port}....`.inverse.bold.blue)
})