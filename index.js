import express from "express";
import Connection from "./database/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import client from '../clientBackend/models/clients.js';

const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
Connection();
app.post('/addClient',async(req ,res)=>{
    try {
        const newUser = new client(req.body);
        await newUser.save();
        return res.status(200).json(newUser);
    } catch (error) {
        console.log(error);
       return res.status(500).json(error);
    }
})
app.get('/getClient',async(req,res)=>{
    try {
        const users=await client.find({});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }})
const port=8000||8080;
app.listen(port,()=>console.log(`Server is running on portm :${port}`))