const mongoose=require('mongoose')


const Requested=new mongoose.Schema({
    key:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        reqired:true
    },
   
})

module.exports=mongoose.model("REQUESTED",Requested)