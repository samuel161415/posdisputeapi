const Requested=require('../model/requested')

const Completed=require('../model/completed')
const Pending=require('../model/pending')
const Keys = require('../model/keys')
const router=require('express').Router()

router.post('/combine',async(req,res) =>{
  // console.log('yes am in');
    
    try{
      const result = await Keys.find({ key: { $in: req.body.keys } });
      return res.status(200).json(result)
    }
    catch{
        res.status(400).json(err)
    }

}) 

module.exports = router