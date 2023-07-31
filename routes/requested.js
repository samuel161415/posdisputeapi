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
router.get('/requested/branch/:branch',async(req,res)=>{
    
  try{
    // const result=await Requested.aggregate([
    //     {
    //       $lookup: {
    //         from: "Keys",
    //         localField: 'key',
    //         foreignField: "key",
    //         as: "keyInfo"
    //       }
    //     },
    //     {
    //       $match: {
    //         "keyInfo.branch":"shiromeda" 
    //       }
    //     }
    //   ])
    //   console.log('result',result);

      const allkeys=await Keys.find({branch:`${req.params.branch}`})
      requested_keys=[]
      for(const key of allkeys){
          requested_keys.push(key['key']) 
      }
      const f_result=await Requested.find({key:{$in:requested_keys}})

      return res.json(f_result)

      }
      catch(err){
         return   res.status(500).json(err)
      }

})
router.get('/all/branch/:branch',async(req,res)=>{
  try{
         const branch= await Keys.find({branch:req.params.branch})
         return  res.status(200).json(branch)

      }
      catch(err){
         return   res.status(500).json(err)
      }

})

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