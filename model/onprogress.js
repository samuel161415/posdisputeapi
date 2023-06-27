const mongoose=require('mongoose')


const OnProgress=new mongoose.Schema({
    key:{
        type:String,
        required:true
    }
   
})

module.exports=mongoose.model("ONPROGRESS",OnProgress )