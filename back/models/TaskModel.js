const mongoose=require('mongoose')

const TaskModel=new mongoose.Schema({
    task:String,
    description:String
})

module.exports=mongoose.model("tasks",TaskModel)