const Requested = require('../model/requested')
const Keys=require('../model/keys')
const router=require('express').Router()


// getting all requested fields
router.get('/requested/get',async(req,res)=>{

    try{
        const result=await Requested.find().sort({_id:-1})
        
         return res.json(result)
    }
    catch(err){
    console.log('error occured',err);
    }


})



router.get('/requested/get/:branch',async(req,res)=>{
    try{
        // filtering key collections using branch
        // console.log('yes i am here',req.params.branch);
           const filteredBranch = await Keys.find({branch: req.params.branch}).sort({_id:-1})
          
           let keyValues = []
           for(var i =0; i< filteredBranch.length; i++){
              keyValues.push(filteredBranch[i].key)
           }
          //  filtering completed collections using keys of the branch
           const result = await Requested.find({ key: { $in: keyValues } })
    
          return res.json(result)
    
      }
      catch(err){
          console.log(err);
      }
})

// getting all keys
router.get('/getAll',async(req,res)=>{
    try{
        
        const result= await Keys.find().sort({_id:-1})
        
        return res.json(result)

    }
    catch(err){
        console.log(err);

    }
})

// adding request to requested database
router.post('/requested/add',async(req,res)=>{
    // generate a key that is not found in key database
    
    const lastKey=await Keys.find().sort({ _id: -1 }).limit(1);
    let key=1
    if(lastKey.length>0){
        key=lastKey[0].key+1
    }
    req.body.key=key
    req.body.date=new Date()

    const newKey=new Keys(req.body);
    const newRequest=new Requested({key,date:req.body.date})
    try{
        const savedKey= await newKey.save();
        const savedRequest=await newRequest.save()
        return  res.status(200).json(savedRequest);
        }
        catch(err){
        return  res.status(500).json(err);
        }

    // try{
    // const savedProduct= await newProduct.save();
    // return  res.status(200).json(savedProduct);
    // }
    // catch(err){
    // return  res.status(500).json(err);
    // }
})



// retrievng requests based on branch



router.delete('/requested/delete',async(req,res)=>{
   const deletedRes=Requested.deleteOne({key:req.body.key})
   try{
    await Requested.deleteOne({key:req.body.key})
    return  res.status(200).json('Key is deleted...')
}
catch(err){
   return  res.status(500).json(err)
}

})

module.exports=router