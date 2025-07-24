import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = 'qwertyiopasdfghjklzxcvbnm';

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

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
    if(passOk){

        jwt.sign({username, id:userDoc._id} ,secret, {}, (err,token) =>{
            if(err) throw err;
            res.cookie('token', token).json('ok')
        });

    }
    else{
        res.status(400).json('wrong credentials');
    }

})

app.get('/profile' ,(req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;
        res.json(info);
    })
})

app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok')
})


app.listen(4000);

//mongodb+srv://Shekhar:Shekhar123@my-blog.ypqpfgu.mongodb.net/?retryWrites=true&w=majority&appName=My-Blog