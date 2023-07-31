const mongoose=require('mongoose')


const Pending=new mongoose.Schema({
    key:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        reqired:true
    },
   
})

module.exports=mongoose.model("PENDING",Pending )