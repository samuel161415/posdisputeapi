const mongoose=require('mongoose')


const Invalid_input=new mongoose.Schema({
    key:{
        type:String,
        required:true
    },
    remark:{
        type:String,
        required:true
    },
     date:{
        type:Date,
        reqired:true
    }
   
})

module.exports=mongoose.model("INVALID",Invalid_input)