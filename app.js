const { application } = require('express');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(require('./src/routes/index.routes.js'))


app.get('/', (req,res)=>{
    res.send({message: 'Hello World !!!'})
})

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`your application running http://localhost:${port}`)
})