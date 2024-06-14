const express=require('express')
require('dotenv').config()
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors())
const mongoose=require('mongoose')
const User=require('./models/userModel')
const Task = require("./models/TaskModel")
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB connected")).catch(err=>console.log(err))
app.post('/',(req,res)=>{
Task.create(req.body).then(result=>res.json(result)).catch(err=>res.json(err))
})
app.get('/',(req,res)=>{
    Task.find({}).then(result=>res.json(result)).catch(err=>res.json(err))
    
})
app.put('/',(req,res)=>{
    const {id,newtitle,description}=req.body;
    Task.findByIdAndUpdate(id,{task:title,description:description}).then(result=>{
        if(!result){

        }
    })
})
app.post('/register',(req,res)=>{
    User.create(req.body).then(result=>res.json(result)).catch(err=>res.json(err))
})
app.post('/login',(req,res)=>{
    User.findOne({email:req.body.email}).then(result=>{
        if(result){
            if(result.password==req.body.password){
                res.json("success")
            }
            else
            res.json("Incorrect")
        }
        else
        {
            res.json("No record found")
        }
        
    })
    .catch(err=>res.json(err))
})
app.listen(3000,()=>{
    console.log("Server is running")
})