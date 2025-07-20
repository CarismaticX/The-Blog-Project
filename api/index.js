import express from 'express';
const app = express();


app.get('/register' ,(req,res) => {
    res.json('test okay');
})

app.listen(4000);