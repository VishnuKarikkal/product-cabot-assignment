const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config/db');
var authBoolean = require('../../config/serverAuth');

function auth(req,res,next) 
{
    
    token=req.header('auth_token')
    
        if(!token) return res.json({"msg":"Access Denied"});

        try
        {
             const verify=jwt.verify(token,secretKey);
             req.user=verify;
             next(); //TOKEN verified :: continue with the req
        }
        catch(err)
        {
             console.log(err);
             return res.json({"msg":"error"});
        }
    
}

module.exports=auth;