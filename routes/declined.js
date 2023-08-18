const router = require('express').Router()
const Requested = require('../model/requested')
const Declined = require('../model/declined')
const Pending = require('../model/pending')
const Keys = require('../model/keys')

router.post('/declined/add/:where',async(req,res)=>{
    
    console.log('where',req.params.where,'body',req.body);
   

    try{
        //  deleting on the pending status
        let c_data={}
        // console.log('on declined');
        
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
            // console.log('declined c_data',c_data);
        }
        else{
            return
        }

        
        req.body.date=c_data.date
        const newDeclined = new Declined(req.body)
        const savedDeclined = await newDeclined.save()

        return res.status(200).json(savedDeclined)
    }
    catch(err){
        console.log(err);
        return  res.status(500).json(err);
    }
})

router.get('/declined/get',async(req,res)=>{
//    console.log('on get');
    try{
        const result=await Declined.find().sort({_id:-1})
        return res.json(result)

    }
    catch(err){
        console.log(err);
        return  res.status(500).json(err);
    }
})

router.get('/declined/get/:branch',async(req,res)=>{
    try{
        // filtering key collections using branch
           const filteredBranch = await Keys.find({branch: req.params.branch}).sort({_id:-1})
          
           let keyValues = []
           for(var i =0; i< filteredBranch.length; i++){
              keyValues.push(filteredBranch[i].key)
           }
          //  filtering completed collections using keys of the branch
           const result = await Declined.find({ key: { $in: keyValues } })
    
          return res.json(result)
    
      }
      catch(err){
          console.log(err);
      }
 })




router.get('/declined/single/:k',async(req,res)=>{
    // console.log('on get',req.params.k);
     try{
         const result = await Declined.findOne({key:req.params.k})
         return res.json(result)
 
     }
     catch(err){
         console.log(err);
         return  res.status(500).json(err);
     }
 })
// router.post('declined/single/:key' , async(req,res)=>{
//     try{
//         console.log('in single declined',req.params.key);
//        const res = await Declined.findOne({key:req.params.key})
//        return res.json(res)
//     }
//     catch(err){
//        console.log(err);
//        return  res.status(500).json(err);
//     }
// })

module.exports=router