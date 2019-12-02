const models = require('../Models/models');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy=require('passport-facebook').Strategy;
const passport=require('passport');
const hashHelper=require('../utils/HashHelper');


    passport.serializeUser(function (user,
                                     done) {
        done(null,user[0].user_id);
    });
    passport.deserializeUser(function (id,done) {
        models.User.findById(id).then(res =>{
            done(null,res);
        })
    });

    passport.use(new FacebookStrategy(
        {
            clientID: process.env.PASSPORT_FB_CLIENTID,
            clientSecret:process.env.PASSPORT_FB_CLIENTSECRET,
            callbackURL: process.env.PASSPORT_FB_CALLBACKURL,
            profileFields:['email','displayName']
        },
        (accessToken, refreshToken, profile,done)=>{
            models.User.findByUsername(profile._json.email).then((res)=>{
                let user;
                user=res;
                if(res.length){
                    return done(null,user);
                }
                user.username=profile._json.email;
                user.name=profile._json.name;
                user.email=profile._json.email;
                models.User.insert(user.username,"",user.name,user.email,"").then((res)=>{
                    user.user_id=res.insertId;
                    users[0]=user;
                    return done(null,users);
                });
            });
        }
    ))

    passport.use('local-login',new LocalStrategy(
        (username,password,done)=>{
            models.User.findByUsername(username).then((res)=>{
                let user;
                user=res;
                if(!res.length){
                    return done(null,false);
                }
                if(!hashHelper.isValidPassword(user,password)){
                    return done(null,false);
                }
                return done(null,user);
            });
        })
    );
    passport.use('local-signup', new LocalStrategy({
            passReqToCallback : true
        },
        (req, username, password, done) => {
            const users =[];
            const user=new models.User();
            models.User.findByUsername(username).then((res) => {
                if (res.length) {
                    return done(null, false);
                }
                user.username=username;
                user.password=hashHelper.createHash(password);
                user.name=req.param('name');
                user.email=req.param('email');
                user.phone=req.param('phone');
                models.User.insert(user.username,user.password,user.name,user.email,user.phone).then((res)=>{
                    user.user_id=res.insertId;
                    users[0]=user;
                    return done(null,users);
                });
            });
        }
    ));