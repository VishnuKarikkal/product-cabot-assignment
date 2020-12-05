const router=require('express').Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
        //requiring USER model
const User = require('../model/User');
        //requiring verifyToken middleware
const verifyToken = require('./verifyToken');

const { secretKey } = require('../../config/db');
var auth = require('../../config/serverAuth');

//renders login page
router.get('/login',(req,res)=>
{
    res.render('login')
}) 
//renders signup page
router.get('/signup',(req,res)=>
{
    res.render('signup')
})
//login credentials check
router.post('/loginCheck',async (req,res)=>
{
    //check if Email(username) exists in the database (if user exists)
    const userExist= await User.findOne({username:req.body.username});
    console.log(userExist)
    if(!userExist) return res.json({'msg':"invalid credentials"});

    //checking whether user entered valid password - by using the COMPARE function offered by bcryptjs (coz passwords are hashed)
    const validPass= await bcrypt.compare(req.body.password,userExist.password);
    //if passwords do not match
    if(!validPass) return res.json({"msg":"invalid password"});
    //if OK
        //creating a TOKEN
        const payload = { _id:userExist._id , role:userExist.role }
        const token=jwt.sign(payload,secretKey);
        if(userExist.role == 'visitor')
        {
          
            return res.redirect('/auth/visitor');
        }
        else
        {
           
            return res.redirect('/admin');
        }

})
//signup credentials saving
router.post('/signupUser',async (req,res)=>
{
    //check if Email(username) exists in the database (if user already exists)
    const userExist= await User.findOne({username:req.body.username});
    if(userExist) return res.json({'msg':"username taken"});

    //hash passwords
    const salt=await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt); //hashing

    const user=new User(
            {
        username:req.body.username,
        password:hashPassword,
        role:req.body.radios
            });

            try
            {
                const savedUser = await user.save();    //saving data of valid user
                return res.json({"msg":"saved","data":savedUser});
            }
            catch(err)
            {
                console.log(err);   //if error
                return res.json({"msg":"error"}).redirect('/'); //redirecting to home page
            }
})
//admin route
router.get('/admin',verifyToken,(req,res)=>
{
    res.json({"msg":"admin"})
})
//visitor route
router.get('/visitor',verifyToken,(req,res)=>
{
    res.json({"msg":"visitor"})
})
module.exports=router;