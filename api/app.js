const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Users = require("./models/User");
const User = require('./models/User');
const userRouter = require("./routes/user");
const PORT = 5000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use('/user', userRouter);

mongoose.connect("mongodb://localhost:27017/todoApp", ()=>{
    console.log("connected to database!");
});

app.get('/', (req,res) =>{
    res.json("Welcome to homepage");
})

app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`); 
})

