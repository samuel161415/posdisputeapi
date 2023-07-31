const mongoose=require('mongoose')


const Keys=new mongoose.Schema({
    key:{
        type:Number,
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
    },
    account:{
        type:String,
        required:true
    },
    pan:{
        type:Number,
        required:true
    },
    trxn_date:{
        type:Date,
        required:true
    },
    terminal:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("KEYS",Keys )