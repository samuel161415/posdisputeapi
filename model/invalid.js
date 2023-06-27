const mongoose=require('mongoose')


const Invalid_input=new mongoose.Schema({
    key:{
        type:String,
        required:true
    }
   
})

module.exports=mongoose.model("INVALID",Invalid_input)