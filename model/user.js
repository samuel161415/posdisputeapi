const mongoose=require('mongoose')


const User=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        reqired:true
    },
    branch:{
        type:String,
        required:true
    }
   
})

module.exports=mongoose.model("USER",User)