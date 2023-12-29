const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const AccountModel = require('./models/account')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var router = require('./apiRouter')

app.use('/api/account', router)


app.get('/', (req, res, next) =>{   
    res.json("Home")
})
app.listen(5000,() =>{
    console.log(`Link: http://localhost:${5000}`)
})
