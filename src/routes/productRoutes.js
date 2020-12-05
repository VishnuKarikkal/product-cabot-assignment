// const express =  require('express')
const multer = require('multer');
const path = require('path');
//requiring model
const Product = require('../model/Product');
//multer image filter
const helpers = require('./helpers');

const router=require('express').Router();

//rendering the add new product page
router.get('/newProduct',(req,res)=>
{
    res.render('newProduct')
})
//getting all products available
router.get('/products', (req,res)=>
{
    
    Product.find()
    .then((data)=>
    {
        if(data.length > 0)
        {
            res.json({"msg":"got it","products":data})
        }
        else
        {
            res.json({"msg":"not avlbl"})
        }
    })
    .catch(err=>
        {
            res.json({"msg":"err"})
        })
})

//adding new product
router.post('/addNew',(req,res)=>
{
    //multer upload method defining
    let upload = multer({ storage: storage , fileFilter: helpers.imageFilter }).single('product');
    //starting image uploading
    upload(req,res,(err,data)=>
    {
    if (req.fileValidationError) {
        return res.json({"msg":"error"}).redirect('/');
    }
    else if (!req.file) {
        return res.json({"msg":"error"}).redirect('/');
    }
    else if (err instanceof multer.MulterError) {
        return res.json({"msg":"error"}).redirect('/');
    }
    else if (err) {
        return res.json({"msg":"error"}).redirect('/');
    }
        //uploaded image path
    let imgPath='/uploads/'+req.file.filename;
        //capturing product data
    let product_data=new Product(
                    {
                name:req.body.name,
                description:req.body.desc,
                image:imgPath
                    });
        //saving product data
                    try
                    {
                        product_data.save();
                       return res.json({"msg":"saved","product":product_data})
                    }
                    catch(err)
                    {
                       return res.json({"msg":"err"}).redirect('/');
                    }
                
    })
    //upload end
})

//multer setup
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,path.join('./','/public/uploads/'));
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

module.exports=router;