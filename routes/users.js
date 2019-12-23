var express = require('express');
var router = express.Router();
const ForgotPassword=require('../controllers/FogotPasswordController');
const ConfirmEmailController=require('../controllers/ConfirmEmailController');
const EditProfileController=require('../controllers/EditProfileController');
const BillController = require('../controllers/BillController');
const passport=require('passport');
require('../controllers/LoginController');


router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/logout',(req,res)=> {
  req.logout();
  res.redirect('/');
});
router.get('/forgot_password', function(req, res, next) {
  res.render('forgot_password', { title: 'Express' });
});
router.post('/forgot_password',ForgotPassword.ForgotPassword);


router.get('/change-password',(req,res,next) =>{
    res.render('change_password');
});
router.post('/change-password',ForgotPassword.ChangePassword);
router.get('/bill', BillController.BillManager);
router.get('/billdetail', BillController.Bill);
router.get('/signup', function(req, res, next) {
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

router.post('/signup',passport.authenticate('local-signup',{
  successRedirect:'/user/ConfirmEmail',
  failureRedirect:'/user/signup',
}));
router.get('/thay-doi', EditProfileController.EditProfile_G);
router.post('/thay-doi', EditProfileController.EditProfile_P);
router.get('/ConfirmEmail',ConfirmEmailController.ConfirmPassword );
router.get('/ConfirmEmailCallBack',ConfirmEmailController.ConfirmPasswordCallBack);

module.exports = router;
