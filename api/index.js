import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from "bcryptjs";
const app = express();

const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Shekhar:Shekhar123@my-blog.ypqpfgu.mongodb.net/?retryWrites=true&w=majority&appName=My-Blog')


app.post('/register' ,async(req,res) => {
    const{username, password} = req.body;
    try{
    const userDoc = await User.create({username, 
        password:bcrypt.hashSync(password, salt)})
    res.json(userDoc);
    }catch(err){
        res.status(400).json(err)
    }
})


app.post('/login', async(req,res) =>{
    const{username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    console.log(passOk);

})

app.listen(4000);

//mongodb+srv://Shekhar:Shekhar123@my-blog.ypqpfgu.mongodb.net/?retryWrites=true&w=majority&appName=My-Blog