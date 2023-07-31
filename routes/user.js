const router = require('express').Router()
const User = require('../model/user')
const CryptoJs = require('crypto-js')

router.post('/register', async(req,res)=>{
    try{
    //   check if user already registered
   
    const user_found = await User.findOne({username:req.body.username})
    
    if(user_found){
        console.log('user found');
        return res.status(409).json({ message: 'User already exists' });
        
    }

    const newUser = new User({
        username : req.body.username,
        branch : req.body.branch,
        password : CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })
    const savedUser = await newUser.save()

    return res.status(201).json('user created successfully')

    }
    catch(err){
        return res.status(500).json(err)
    }
})

router.post('/login', async(req,res)=>{
    try{
        console.log('login entered',req.body);
    
        const user=await User.findOne({username:req.body.username});
     

        if(!user)  return res.status(401).json("user not found");
    
        const tempPass = user.password;
    
        var decrypted = CryptoJs.AES.decrypt(tempPass,process.env.PASS_SEC).toString(CryptoJs.enc.Utf8);
        if(decrypted!==req.body.password) return res.status(401).json('wrong credentials');
    
        const{password, ...others}=user._doc;
        
       return res.status(200).json({...others})
    }
      catch(err){
       return  res.status(500).json(err)
      }

})

module.exports = router