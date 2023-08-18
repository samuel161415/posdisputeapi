const Requested=require('../model/requested')

const Completed=require('../model/completed')
const Pending=require('../model/pending')
const Keys = require('../model/keys')
const router=require('express').Router()

// converting request from requested to 
router.post('/completed/add',async(req,res)=>{

  //  console.log('am in completed',' key', req.body.key);
      let c_data={}
      
       try{

         c_data = await Pending.findOne({key:req.body.key})
         const deletedRes=await Pending.deleteOne({key:req.body.key})
        //  console.log('c_date',c_data);

         req.body.date=c_data.date
         
         const newCompleted = new Completed(req.body)
         const savedCompleted = await newCompleted.save()
         return  res.status(200).json(savedCompleted);
       }
       catch(err){
         console.log(err);
         return  res.status(500).json(err);
       }
       
})

router.get('/completed/get',async(req,res)=>{

   try{
       const result=await Completed.find().sort({_id:-1})
       return res.json(result)

   }
   catch(err){
       console.log(err);
   }
})

router.get('/completed/get/:branch',async(req,res)=>{
  // console.log('current branch is ',req.params.branch);

  try{
    // filtering key collections using branch
       const filteredBranch = await Keys.find({branch: req.params.branch}).sort({_id:-1})
      
       let keyValues = []
       for(var i =0; i< filteredBranch.length; i++){
          keyValues.push(filteredBranch[i].key)
       }
      //  filtering completed collections using keys of the branch
       const result = await Completed.find({ key: { $in: keyValues } })

      return res.json(result)

  }
  catch(err){
      console.log(err);
  }
})

module.exports=router