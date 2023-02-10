const mongoose = require('mongoose')
const validator = require('validator')
const User = require("./userModel") ;

const organizationSchema = new mongoose.Schema({
    name : String, 
    users :[
        {type:Object},
         {
        
             user_id:{
                 type : mongoose.Schema.Types.ObjectId ,
                 ref : 'User' 
             },
             user_type: { 
                 type: String,
                 default: 'user' //admin
             }
        }
    ]
})

module.exports = mongoose.model('Organization' , organizationSchema) ;
