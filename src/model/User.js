const mongoose=require('mongoose');
const userSchema=new mongoose.Schema(
    {
        username:String,
        role:String,
        password:String
    });
module.exports=mongoose.model('User',userSchema);