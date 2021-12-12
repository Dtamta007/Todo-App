const express = require('express');
const router = express.Router();
const passport = require('passport');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passportConfig = require('../passport');
const User = require('../models/User');
const Todo = require('../models/Todo');

const signToken = (userId) =>{
    return JWT.sign({
        iss: "Fake Company",
        sub : userId
    }, "This is a secret key", {expiresIn: "1h"});
}

router.post('/register', async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            password : hashedPassword,
            role: req.body.role
        });

        const user = await newUser.save();
        console.log(user);
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({message: {msgBody: err, msgError: true}});
    }
})

router.post('/login', passport.authenticate('local', {session:false}), (req,res)=>{
    if(req.isAuthenticated()){
        const {_id, username, role} = req.user;
        const token = signToken(_id);
        res.cookie("access_token", token, {httpOnly:true, sameSite:true});
        res.status(200).json({isAuthenticated:true, User: {username, role}, token: token});
    }
})

router.get('/logout', passport.authenticate('jwt', {session:false}), (req,res)=>{
    res.clearCookie('access_token');
    res.status(200).json({user: {username: "", role:""}, success : true});

})

router.post('/todo', passport.authenticate('jwt', {session:false}), async (req,res)=>{
    try{
        const todo = new Todo(req.body);
        await todo.save();
        req.user.todos.push(todo);
        await req.user.save();
        res.status(200).json({message : {msgBody: "successfully created todo", msgError: false}});
    }catch(err){
        console.log(err);
        res.status(500).json({message: {msgBody: "An Error occured while making todos", msgError: true}});
    }

});

router.get('/todos', passport.authenticate('jwt', {session:false}), async (req,res)=>{
    try{
        const user = await User.findById(req.user._id).populate('todos').exec();
        res.status(200).json({todos: user.todos, authenticated: true});
    }catch(err){
        console.log(err);
        res.status(500).json({message: {msgBody: "An error occured to get all the todos!", msgError: true}});
    }
})

router.get('/admin',passport.authenticate('jwt', {session:false}),(req,res)=>{
    if(req.user.role === "admin"){
        res.status(200).json({message: {msgBody: "You are an admin", msgError: false}});
    }else{
        res.status(403).json({message: {msgBody: "You are not an admin", msgError: true}});
    }
})

router.get('/authenticated',passport.authenticate('jwt', {session:false}),(req,res)=>{
    const {username, role} = req.user;
    res.status(200).json({isAuthenticated: true, user: {username,role}});
})

module.exports = router;