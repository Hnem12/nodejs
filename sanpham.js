const express = require('express');
var router = express.Router() 
const SanphamModel = require('../models/sanpham');
const { check,validationResult } = require('express-validator');

// hien thi tat ca san pham
router.get('/', (req, res, next) => {
    SanphamModel.find({ }).populate('danhmuc_id')
        .then(data => {
            res.json(data)
        })
        .catch(err => {
        res.status(500).json('Loi server 2')
    })
})

// tìm sản phẩm theo id
router.get('/:id', (req, res, next) => {
    var _id = req.params.id
    SanphamModel.findById({ _id })
        .then(data => {
            if(data){
                res.json(data)
                }
        })
        .catch(err => {
        res.status(500).json('Loi server')
    })
})

// hien thi danh sach san pham theo id danh muc 
router.get('/danhmuc/:id', (req, res, next) => {
    const Danhmuc_id = req.params.id
    SanphamModel.find({
        danhmuc_id:Danhmuc_id
    }).populate('danhmuc_id')
        .then(data => {
            if (data) {
                res.json(data)
            }
        })
        .catch(err => {
        res.status(500).json('Loi server')
    })
})

 // tao moi danh muc
router.post('/taomoi',
    [check('tensanpham').notEmpty().withMessage('Ten san pham khong duoc phep de trong'),
    check('dongia').notEmpty().withMessage('Don gia khong duoc phep de trong'),
    check('mota').notEmpty().withMessage('Mo ta khong duoc phep de trong'),
    check('soluong').notEmpty().withMessage('So luong khong duoc phep de trong'),
    check('anhdaidien').notEmpty().withMessage('Anh dai dien khong duoc phep de trong'),
    check('danhmuc_id').notEmpty().withMessage('ID cua Danh muc khong duoc phep de trong')],
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(500).json({ errors: errors.array() });
        }
    var Tensanpham = req.body.tensanpham
    var Dongia = req.body.dongia
    var Mota = req.body.mota
    var Soluong = req.body.soluong
    var Anhdaidien = req.body.anhdaidien
    var Danhmucid = req.body.danhmuc_id
    SanphamModel.findOne({
        tensanpham: Tensanpham,
    })
    .then(data => {
        if (data) {
        res.json('San pham nay đa ton tai !!!')
        }   
        else {
           return SanphamModel.create({
            tensanpham: Tensanpham,
            dongia: Dongia,
            mota: Mota,
            soluong: Soluong, 
            anhdaidien: Anhdaidien,
            danhmuc_id: Danhmucid
        })
        }
    })
    .then(data => {
        if(data){
            res.json('Them moi san pham thanh cong !!!')
        }
    })
    .catch(err => {
        res.status(500).json('Loi server !!!')
    })
})


//Sua san pham
router.put('/:id', (req, res, next) => {
    var _id = req.params.id
    var Tensanpham = req.body.tensanpham
    var Dongia = req.body.dongia
    var Mota = req.body.mota
    var Soluong = req.body.soluong
    var Anhdaidien = req.body.anhdaidien
    var Danhmucid = req.body.danhmuc_id
    SanphamModel.findByIdAndUpdate(_id, {
       tensanpham: Tensanpham,
        dongia: Dongia,
        mota: Mota,
        soluong: Soluong, 
        anhdaidien: Anhdaidien,
        danhmuc_id: Danhmucid
    })
        .then(data => {
            if (data) {
            res.json('Update thanh cong !!!')
            }
            else {
                res.json("Update that bai !!!")
            }
        })
        .catch(err => {
            res.status(500).json("Loi !!!")
    })
})
// xoa san pham
router.delete('/:id', (req, res, next) => {
    var id = req.params.id;
    SanphamModel.deleteOne({
        _id: id
    })
        .then(data => {
            if (data) {
                res.json('Xoa thanh cong !!!');
            }
            else {
                res.json('Xoa that bai !!!')
            }
        })
        .catch(err => {
        res.status(500).json('loi server!!!')
    })
})


module.exports = router