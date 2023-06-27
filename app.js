const express=require('express')
const app=express()
const PORT=7000
app.get('/api',(req,res)=>{
    res.send('working')
})

app.listen(PORT||7000,()=>{
    console.log('app is listning');
})


