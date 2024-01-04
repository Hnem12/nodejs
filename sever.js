const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const AccountModel = require('./models/account')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var danhmuctRouter= require('./routers/danhmuc')
app.use('/api/danhmuc/', danhmuctRouter)

var sanphamRouter= require('./routers/sanpham')
app.use('/api/sanpham/', sanphamRouter)

var router = require('./apiRouter')

app.use('/api/account', router)


app.get('/', (req, res, next) =>{   
    res.json("Home")
})
app.listen(5000,() =>{
    console.log(`Link: http://localhost:${5000}`)
})
