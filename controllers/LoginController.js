const models = require('../Models/models');
const passport=require('passport');
const LocalStrategy = require('passport-local').Strategy;

exports.Passport=(req,res,nexr) => {
    passport.serializeUser(function (user,done) {
        done(null,user[0].user_id);
    });
    passport.deserializeUser(function (id,done) {
        models.User.findById(id).then(res=>{
            done(null,res);
        })
    });
    passport.use(new LocalStrategy(
        (username,password,done)=>{
            models.User.findByUsername(username).then((res)=>{
                let user;
                user=res;
                if(!res.length){
                    return done(null,false);
                }
                if(user[0].password !== password){
                    return done(null,false);
                }
                return done(null,user);
            });
        })
    );
};