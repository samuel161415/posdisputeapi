const Requested=require('../model/requested')
const Keys=require('../model/keys')
const Completed=require('../model/completed')
const Pending=require('../model/pending')
const router=require('express').Router()

// converting request from requested to pending 
router.post('/pending/add',async(req,res)=>{
    // console.log('hi there');
      req.body.date=new Date()
      const savedCompleted= new Pending(req.body)
       try{
        const deletedRes=await Requested.deleteOne({key:req.body.key})
        // console.log('deleted',deletedRes);
         const result=await savedCompleted.save()
         return  res.status(200).json(result);
       }
       catch(err){
          console.log(err);
       }
})

router.get('/pending/get',async(req,res)=>{

    try{
        const result=await Pending.find().sort({_id:-1})
        return res.json(result)

    }
    catch(err){
        console.log(err);
    }
})

router.get('/pending/get/:branch',async(req,res)=>{

    try{
        // filtering key collections using branch
           const filteredBranch = await Keys.find({branch: req.params.branch}).sort({_id:-1})
          
           let keyValues = []
           for(var i =0; i< filteredBranch.length; i++){
              keyValues.push(filteredBranch[i].key)
           }
          //  filtering completed collections using keys of the branch
           const result = await Pending.find({ key: { $in: keyValues } })
    
          return res.json(result)
    
      }
      catch(err){
          console.log(err);
      }
})

module.exports=router