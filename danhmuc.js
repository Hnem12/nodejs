const express = require('express');
var router = express.Router() 
const DanhmucModel = require('../models/danhmuc');
const { check,validationResult } = require('express-validator');
const AccountModel = require('../models/account');

// hien thi cac danh muc
router.get('/', (req, res, next) => {
    DanhmucModel.find({})
        .then(data => {
        res.json(data)
        })
        .catch(err => {
        res.status(500).json('Loi server')
    })
})
// tìm danh muc theo id
router.get('/:id', (req, res, next) => {
    var _id = req.params.id
    DanhmucModel.findById({ _id })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
        res.status(500).json('Loi server')
    })
})
// tao moi danh muc
router.post('/taomoi',
    [check('tendanhmuc').notEmpty().withMessage('ten danh muc khong duoc phep de trong'),
    check('mota').notEmpty().withMessage('mo ta khong duoc phep de trong')],
    (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }
    var Tendanhmuc = req.body.tendanhmuc
    var Mota = req.body.mota
    DanhmucModel.findOne({
        tendanhmuc: Tendanhmuc,
    })
    .then(data => {
        if (data) {
        res.json('Danh mục nay đa ton tai !!!')
        }
        else {
            return DanhmucModel.create({
                tendanhmuc: Tendanhmuc,
                mota: Mota,
            })
        }
    })
        .then(data => {
            if(data){
                res.json('Tao danh muc thanh cong !!!')
                }
        })
        .catch(err => {
        res.status(500).json('Tao danh muc that bai !!!')
    })
})

// sua
router.put('/:id', (req, res, next) => {
    var _id = req.params.id
    var Newtendanhmuc = req.body.newtendanhmuc
    var NewmoTa=req.body.newmota
    DanhmucModel.findByIdAndUpdate(_id, {
        tendanhmuc: Newtendanhmuc,
        mota: NewmoTa,
    })
        .then(data => {
            if (data) {
            res.json('Update thanh cong!!!')
            }
            else {
                res.json("Update that bai!!!")
            }
        })
        .catch(err => {
            res.status(500).json("Loi server!!!")
    })
})
// xoa
router.delete('/:id', (req, res, next) => {
    var id = req.params.id;
    DanhmucModel.deleteOne({
        _id: id
    })
        .then(data => {
            if (data) {
                res.json('Xoa thanh cong!!!');
            }
            else {
                res.json('Xoa that bai!!!')
            }
        })
        .catch(err => {
        res.status(500).json('loi server!!!')
    })
})

module.exports = router