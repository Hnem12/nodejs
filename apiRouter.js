const express = require('express')
const AccountModel = require('./models/account')
const router = express.Router()
const { body, validationResult } = require('express-validator');

router.get('/', (req, res, next) =>{
    var username = req.body.username
    var password = req.body.password

    AccountModel.find({})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('Dang bi loi')
    })

})

router.post('/',
[body('username').notEmpty().withMessage('Chua nhap tai khoan'),
body('password').notEmpty().withMessage('Chua nhap mat khau')], 
(req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }

    var username = req.body.username
    var password = req.body.password

    AccountModel.create({
        username: username,
        password: password
    })
    .then(data=>{
        res.json('Tao thanh cong')
    })
    .catch(err=>{
        res.status(500).json('Loi')
    })
})

router.put('/:id', (req, res, next) =>{
    var id = req.params.id
    var newuserName = req.body.newuserName
    var newPassword = req.body.newPassword
    AccountModel.findByIdAndUpdate(id, {
        username: newuserName,
        password: newPassword
    })
    .then(data=>{   
        res.json('Sua thanh cong')
    })
    .catch(err =>{
        res.status(500).json('Loi sever')
    })
})


router.get('/:id', (req, res, next) =>{
    var id = req.params.id

    AccountModel.findById({id})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('Dang bi loi sever')
    })

})




router.delete('/:id', (req, res, next) =>{
    var id = req.params.id
    AccountModel.deleteOne({
        _id: id
    })
    .then(data=>{
        res.json('Xoa thanh cong')
    })
    .catch(err=>{
        res.status(500).json('Loi sever')
    })
})



module.exports = router
