const express = require('express');
const bodyparser = require('body-parser');
        //requiring route modules
const authRoutes=require('./src/routes/authRoutes');
const productRoutes=require('./src/routes/productRoutes');
        //express instance
const app = new express();

app.use(bodyparser.urlencoded({extended:true}));
        //static folder
app.use(express.static('./public'));
        //view engine setup
app.set('view engine','ejs');
        //views folder setup
app.set('views',__dirname+"/src/views");
        //defining routes
app.use('/product',productRoutes);
app.use('/auth',authRoutes);
        //root request handler
app.get('/',(req,res)=>
{
    res.render('index')
})
        
        //server setup
port=process.env.PORT || 3000 ;
app.listen(port,()=>{console.log("server up at",port)});