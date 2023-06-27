const mongoose=require('mongoose')


const Keys=new mongoose.Schema({
    key:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        reqired:true
    },
    amount:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model("KEYS",Keys )