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
app.post('/todo',(req,res)=>{
Task.create(req.body).then(result=>res.json(result)).catch(err=>res.json(err))
})
app.get('/todo',(req,res)=>{
    Task.find({}).then(result=>res.json(result)).catch(err=>res.json(err))
    
})

app.put('/todo:id', (req, res) => {
    const { id } = req.params;
    const { task, description } = req.body;
  
    Task.findByIdAndUpdate(id, { task, description }, { new: true })
      .then(updatedTodo => {
        if (!updatedTodo) {
          return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(updatedTodo);
      })
      .catch(err => {
        console.error('Error updating todo:', err);
        res.json({ error: 'Internal server error' });
      });
  });
  app.delete('/todo:id', (req, res) => {
    var { id } = req.params;
    console.log(id)
    Task.findByIdAndDelete(id)
      .then(result => {
        if (!result) {
          res.json({ message: "Todo not found" });
        }
        else
        res.json({ message: "Deleted successfully" });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  });
  

  app.post('/',(req,res)=>{
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