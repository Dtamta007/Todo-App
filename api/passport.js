const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const bcrypt = require('bcrypt');
const JwtStrategy = require('passport-jwt').Strategy;

const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

// For authorization of routes
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "This is a secret key"
}, (payload, done)=>{
    User.findById({_id: payload.sub}, (err,user)=>{
        if(err)
            done(err,false);
        if(user)
            return done(null,user)
        return done(null,false);
    });
}));


// Authentication local stratergy using username and password
passport.use(new LocalStrategy(async (username,password,done)=>{
    try{
        const user = await User.findOne({username : username});
        // User not found
        if(!user){
            return done(null,false)
        }

        const verify = await bcrypt.compare(password, user.password);
        // If password is incorrect
        if(!verify){
            console.log("Password is incorrect");
            return done(null, false);
        }
        return done(null,user);
    }catch(err){
        console.log(err);
    }
}))