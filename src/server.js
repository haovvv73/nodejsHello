// const express = require('express')
// const path = require('path')
// day la cach import cu es5
// tuong duong vs impprt es6
import express from 'express'
import configViewEngine from './config/viewEngine'
import initWebRoute from './route/web'
require('dotenv').config()
import connection from './config/connectionDB'
import initApiRoute from './route/api'
import appRoot from 'app-root-path'
var morgan = require('morgan')

const app = express()
// craete 1 instace de su dung tat ca cac chuc nang
// cu phap process.env.NAME co the dung trong js syntax
// trong node js ta phai dung package ngoai vi node js ko ho tro cu phap nay
const port = process.env.PORT || 3000 // backup

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// custome middleware
app.use((req, res, next) => {
    console.log("my custome middleware");
    console.log(">>>>>>>>>>>>>>>>>>>>>>>");
    next()
})

// logger middleware
app.use(morgan('combined'))

// setting
configViewEngine(app)

// routes
initWebRoute(app)

// api route
initApiRoute(app)

// handle 404 not found
// if server dont know any route this route will send to browser
app.use((req, res) => {
    return res.send('404 NOT FOUND')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})