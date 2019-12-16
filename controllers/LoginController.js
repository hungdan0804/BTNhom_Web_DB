const models = require('../Models/models');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy=require('passport-facebook').Strategy;
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const passport=require('passport');
const hashHelper=require('../utils/HashHelper');


    passport.serializeUser(function (user,done) {
        done(null,user.user_id);
    });
    passport.deserializeUser(function (id,done) {
        models.User.findById(id).then(res =>{
            done(null,res);
        })
    });

    passport.use(new GoogleStrategy({
        clientID:process.env.PASSPORT_GG_CLIENTID,
        clientSecret:process.env.PASSPORT_GG_CLIENTSECRET,
        callbackURL:process.env.PASSPORT_GG_CALLBACKURL,
        profileFields:['email']
        },(accessToken, refreshToken, profile,done)=>{
        var user;
        models.User.findByUsername(profile._json.email).then((res)=>{
            user=res;
            if(res.length){
                return done(null,user[0]);
            }
            user.username=profile._json.email;
            user.name=profile._json.name;
            user.email=profile._json.email;
            return models.User.insert(user.username,"",user.name,user.email,"")
        }).then((res)=>{
            if(res != undefined){
            user.user_id=res.insertId;
            }
            return done(null,user);
        });
        })
    );

    passport.use(new FacebookStrategy(
        {
            clientID: process.env.PASSPORT_FB_CLIENTID,
            clientSecret:process.env.PASSPORT_FB_CLIENTSECRET,
            callbackURL: process.env.PASSPORT_FB_CALLBACKURL,
            profileFields:['email','displayName']
        },
        (accessToken, refreshToken, profile,done)=>{
            var user;
            models.User.findByUsername(profile._json.email).then((res)=>{
                user=res;
                if(res.length){
                    return done(null,user[0]);
                }
                user.username=profile._json.email;
                user.name=profile._json.name;
                user.email=profile._json.email;
                return models.User.insert(user.username,"",user.name,user.email,"")
            }).then((res)=>{
                user.user_id=res.insertId;
                return done(null,user);
            });
        }
    ));

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
                return done(null,user[0]);
            });
        })
    );
    passport.use('local-signup', new LocalStrategy({
            passReqToCallback : true
        },
        (req, username, password, done) => {
            var user=new models.User();
            models.User.findByUsername(username).then((res) => {
                if (res.length) {
                    return done(null, false);
                }
                user.username=username;
                user.password=hashHelper.createHash(password);
                user.name=req.param('name');
                user.email=req.param('email');
                user.phone=req.param('phone');
                return models.User.insert(user.username,user.password,user.name,user.email,user.phone);
            }).then((res)=>{
                user.user_id=res.insertId;
                return done(null,user);
            });
        }
    ));