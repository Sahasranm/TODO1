const mongoose=require('mongoose')

const UserModel=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

module.exports=mongoose.model("users",UserModel)