const users = require('../models/userModel')

const userService = require("../Db_Services/userDbService")

const getAllUsers = async (req, res) => {
   try {
      const user = await userService.getAllUser()
      res.send(user);
   } catch (error) {
      res.status(401).send(error)
   }
 }

 const createUser =  async (req, res) => {
    try {
      const user = new users(req?.body);
      await userService.saveUser(user)
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(400).send(error)
    }
   }

   const getUserById = async (req,res)=>{
      try {
         const id = req?.params?.id;
         const user = await userService.getUserById(id)
         if(!user){
            return res.status(404).send({error:"user not found with id "+id})
         }
         res.send(user)
      } catch (error) {
         res.status(400).send(error)
      }
   }

   const updateUser = async (req,res)=>{
      try {
         const id = req?.params?.id;
         const userData = req?.body;

         const user = await userService.getUserById(id)
     
         if (!user) {
           return res.status(404).send({ error: 'User not found' });
         }
     
         Object.assign(user, userData);
         await userService.saveUser(user)
     
         res.send({ message: 'User updated successfully' ,user});
       } catch (error) {
         res.status(500).send({ error: 'Failed to update user' });
       }
   }

   const deleteUser = async(req,res)=>{
      try {
         
         const id = req?.params?.id
         const user = await userService.deleteUserById(id)
         if(!user){
           return res.status(404).send({error:"user not found with id "+id})
         }
         res.send({message:"delete done !",user})
      } catch (error) {
         res.status(400).send(error)
      }
   }

   const findUserByEmail = async(req,res)=>{
      try {
         const email = req.params.email
         console.log(email);
         const user = await userService.getUserByEmail(email)
         if(!user){
            return res.status(404).send({message:"user is not found"})
         } 
         res.send(user)
      } catch (error) {
         res.status(400).send(error)
      }
   }

  module.exports = {getAllUsers,createUser,getUserById,updateUser,deleteUser,findUserByEmail}