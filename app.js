const express=require('express')
const app=express()
const dotenv=require('dotenv')
const cors=require('cors')
dotenv.config()

const connectDB=require('./connection')
connectDB()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

const requested=require('./routes/requested')
const completed = require('./routes/completed')
const pending = require('./routes/pending')
const keys = require('./routes/keys')
const declined = require('./routes/declined')
const invalid = require('./routes/invalid')
const user = require('./routes/user')
const combine = require('./routes/combine')

app.use('/api',requested)
app.use('/api',completed)
app.use('/api',pending)
app.use('/api',keys)
app.use('/api',declined)
app.use('/api',invalid)
app.use('/api',user)
app.use('/api',combine)

app.listen(process.env.PORT||7000,()=>{
    console.log('app is listning');
})




