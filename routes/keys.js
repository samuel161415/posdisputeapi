const Keys=require('../model/keys')
const router=require('express').Router()



router.get('/single/:key',async(req,res)=>{
       
    try{
        const result=await Keys.findOne({key:req.params.key})
        return res.json(result)

    }
    catch(err){
        console.log(err);
    }
})

module.exports=router