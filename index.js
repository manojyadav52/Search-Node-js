const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT =8080;



app.use(express.json());
app.use(express.urlencoded({extended:true}));


// create mongodbDatabase
mongoose.connect('mongodb://localhost:27017/Pro-4',
{useNewUrlParser: true, useUnifiedTopology: true});

// create Schema

const productData =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    discount:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    description:{
        type:String
    }

});


// create model
const Product = mongoose.model("Product",productData);

// insert Product
app.post('/api/product', async (req,res)=>{
        try{
            const insertData = await Product.insertMany(req.body);
            if(insertData){
                res.json(insertData);
            }else{  
                res.json({error:"data not inserted"});
            }
        }catch(error){
            res.json({error: "interanl server issue"});
        }
});


// get data 
app.get('/api/product', async (req,res)=>{
    try{
            const getData = await Product.find();
            if(getData){
                res.json(getData);
            }else{
                res.json({error:"data not getting"});
            }
    }catch(error){
        res.json({error:"internal Server Issue"});
    }
});



// Serch Product 
app.get('/api/search',async (req,res)=>{
        try{
                const query =req.query.query;
                const regex = new RegExp(query,'i');
                const searchData =await Product.find({$or:[{name:regex}]});
                if(searchData){
                    res.json(searchData);
                }else{
                    res.json({error:"data not found"});
                }
        }catch(error){
            res.json({error:"Interanl server Issue"});
        }
})


// creatred server 
app.listen(PORT,(req,res)=>console.log(`server will be listening the port: ${PORT}`));