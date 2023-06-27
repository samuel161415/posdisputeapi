const mongoose=require('mongoose')


const Requested=new mongoose.Schema({
    key:{
        type:String,
        required:true
    }
   
})

module.exports=mongoose.model("REQUESTED",Requested)