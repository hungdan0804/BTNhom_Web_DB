const express = require('express');
const database = require('../utils/Database');
const router = express.Router();
const models = require('../Models/models');
const ShopController = require('../controllers/ShopController');
const ProductController = require('../controllers/ProductControllers');
const HomeController = require('../controllers/HomeControllers');
const LoginController = require('../controllers/LoginController');
const Passport=require('../controllers/LoginController');
const passport=require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy=require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const hashHelper=require('../utils/HashHelper');


/* GET home page. */
router.get('/', HomeController.Home);
router.get('/shop', ShopController.Shop);
router.get('/product', ProductController.Product);
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/dang-ky', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});
router.get('/auth/facebook',passport.authenticate('facebook',{scope:['email']}));
router.get('/auth/facebook/callback',passport.authenticate('facebook',{
  successRedirect:'/',
  failureRedirect:'/',
}))

router.post('/login',passport.authenticate('local-login',{
  successRedirect:'/',
  failureRedirect:'/Login',
}));
router.post('/dang-ky',passport.authenticate('local-signup',{
  successRedirect:'/Login',
  failureRedirect:'/dang-ky',
}));

passport.serializeUser(function (user,done) {
  done(null,user[0].user_id);
});
passport.deserializeUser(function (id,done) {
  models.User.findById(id).then(res=>{
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
          return done(null,false);
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


/*models.Category.GetAll(function (err,listCategories) {
       if(err)throw err;
        models.Products.GetProductByCategoryId(id, function (err, listProduct) {
            if (err) throw err;
            models.Products.CountItemGroupByCategoryId(id,function (err,count){
                if (err) throw err;
                res.render('shop', {category: listCategories, product: listProduct, item_count: count});
            })
        })
})*/

router.get('/gio-hang', function(req, res, next) {
  res.render('gio_hang', { title: 'Express' });
});
router.get('/thanh-toan', function(req, res, next) {
  res.render('thanh_toan', { title: 'Express' });
});

router.get('/thay-doi', function(req, res, next) {
  res.render('edit_profile', { title: 'Express' });
});
router.get('/quen-mat-khau', function(req, res, next) {
  res.render('forgot_password', { title: 'Express' });
});
router.get('/top10', function(req, res, next) {
  res.render('top10', { title: 'Express' });
});

module.exports = router;