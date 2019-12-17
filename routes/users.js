var express = require('express');
var router = express.Router();
const ForgotPassword=require('../controllers/FogotPasswordController');
const ConfirmEmailController=require('../controllers/ConfirmEmailController');
const passport=require('passport');
require('../controllers/LoginController');


router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/logout',(req,res)=> {
  req.logout();
  res.redirect('/');
});
router.get('/quen-mat-khau', function(req, res, next) {
  res.render('forgot_password', { title: 'Express' });
});
router.post('/quen-mat-khau',ForgotPassword.ForgotPassword);


router.get('/change-password',(req,res,next) =>{
    res.render('change_password');
});

router.post('/change-password',ForgotPassword.ChangePassword);

router.get('/dang-ky', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});
router.get('/auth/facebook',passport.authenticate('facebook',{scope:['email']}));
router.get('/auth/facebook/callback',passport.authenticate('facebook',{
  successRedirect:'/',
  failureRedirect:'/',
}));

router.get('/auth/google',passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);
router.get("/auth/google/callback", passport.authenticate('google',{
    successRedirect:'/',
    failureRedirect:'/',
}));


router.post('/login',passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/user/Login',
}));

router.post('/dang-ky',passport.authenticate('local-signup',{
  successRedirect:'/user/ConfirmEmail',
  failureRedirect:'/user/dang-ky',
}));
router.get('/thay-doi', function(req, res, next) {
  res.render('edit_profile');
});
router.get('/ConfirmEmail',ConfirmEmailController.ConfirmPassword );
router.get('/ConfirmEmailCallBack',ConfirmEmailController.ConfirmPasswordCallBack);

module.exports = router;
