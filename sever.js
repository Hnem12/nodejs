const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const AccountModel = require('./models/account')
const DanhmucModel = require('./models/danhmuc')
const SanphamModel= require('./models/sanpham')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var router = require('./router/apiRouter')
app.use('/api/account/', accountRouter)

var danhmuctRouter= require('./router/danhmuc')
app.use('/api/danhmuc/', danhmuctRouter)

var sanphamRouter= require('./router/sanpham')
app.use('/api/sanpham/', sanphamRouter)



app.get('/', (req, res, next) =>{   
    res.json("Home")
})
app.listen(5000,() =>{
    console.log(`Link: http://localhost:${5000}`)
})
