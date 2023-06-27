const mongoose=require('mongoose')


const Completed=new mongoose.Schema({
    key:{
        type:String,
        required:true
    }
   
})

module.exports=mongoose.model("COMPLETED",Completed)