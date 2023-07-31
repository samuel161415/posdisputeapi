const mongoose=require('mongoose')


const Declined_Input=new mongoose.Schema({
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
    },
   
})

module.exports=mongoose.model("Declined",Declined_Input)