const model=require('../Models/UsersModel');

exports.EditProfile_G=(req,res,next)=>{
    res.render('edit_profile');
};
exports.EditProfile_P=(req,res,next)=>{
    model.UpdateProfile(req.user.username,req.body.fullname,req.body.email);
    res.render('edit_profile');
};