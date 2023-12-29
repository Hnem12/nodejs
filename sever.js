const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const AccountModel = require('./models/account')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/register', (req, res, next) =>{
   var username = req.body.username
   var password = req.body.password

   AccountModel.findOne({
    username: username
   })
   .then(data=>{
        if(data){
            res.json('Acc nay da ton tai')
        }else{
            return AccountModel.create({
                username: username,
                password: password
            })
        }
   })
   .then(data=>{
    res.json('Tao acc thanh cong')
   })
   .catch(err=>{
    res.status(500).json('Tao acc that bai')
   })
})

app.post('/login', (req, res, next) =>{
    var username = req.body.username
    var password = req.body.password

    AccountModel.findOne({
        username: username,
        password: password
    })
    .then(data=>{
        if(data){
            res.json('Dang nhap thanh cong')
        }else{
            res.status(400).json('Dang nhap that bai')
        }
    })
    .catch(err=>{
        res.status(500).json('Co loi sever')
    })
})

var router = require('./apiRouter')

app.use('/api/account', router)


app.get('/', (req, res, next) =>{   
    res.json("Home")
})
app.listen(5000,() =>{
    console.log(`Link: http://localhost:${5000}`)
})