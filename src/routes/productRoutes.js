const router=require('express').Router();

router.get('/newProduct',(req,res)=>
{
    res.render('newProduct')
})

module.exports=router;