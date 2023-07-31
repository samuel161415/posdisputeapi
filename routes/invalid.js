const router = require('express').Router()
const Requested = require('../model/requested')
const Invalid = require('../model/invalid')
const Pending = require('../model/pending')

router.post('/invalid/add/:where',async(req,res)=>{

    try{
        //  deleting on the pending status
        let c_data={}
        console.log('on invalid');
        
        if(req.params.where==='pending'){
            c_data = await Pending.findOne({key:req.body.key})
            const deletedPending = await Pending.deleteOne({key:req.body.key})
        }
        else if(req.params.where==='requested'){
             c_data = await Requested.findOne({key:req.body.key})
            const deletedPending = await Requested.deleteOne({key:req.body.key})
            if(deletedPending){
                console.log("deleted successfully");
            }
            console.log('declined c_data',c_data);
        }
        else{
            return
        }

        
        req.body.date=c_data.date
        const newInvalid = new Invalid(req.body)
        const savedInvalid = await newInvalid.save()

        return res.status(200).json(savedInvalid)
    }
    catch(err){
        console.log(err);
        return  res.status(500).json(err);
    }
})


router.get('/invalid/get',async(req,res)=>{

    try{
        const result=await Invalid.find().sort({_id:-1})
        return res.json(result)

    }
    catch(err){
        console.log(err);
    }
})

router.get('/invalid/single/:k',async(req,res)=>{
    console.log('on get',req.params.k);
     try{
         const result = await Invalid.findOne({key:req.params.k})
         return res.json(result)
 
     }
     catch(err){
         console.log(err);
         return  res.status(500).json(err);
     }
 })

module.exports=router