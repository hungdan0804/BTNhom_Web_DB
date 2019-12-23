const nodeMailer=require('nodemailer');
const model=require('../Models/UsersModel');
const bycrypt=require('../utils/HashHelper');

exports.ForgotPassword=(req,res,next)=> {
    model.findByEmail(req.body.email).then(res2=> {
        if(res2.length) {
            var transporter = nodeMailer.createTransport({
                host: 'smtp.gmail.com',
                auth: {
                    type: 'login',
                    user: process.env.SERVER_GMAIL,
                    pass: process.env.SERVER_GMAIL_PASSWORD
                }
            });
            const mainOptions = {
                from: process.env.SERVER_NAME,
                to: req.body.email,
                subject: 'Quên mật khẩu',
                text: 'Bạn nhân được mail từ ' + req.body.email,
                html: '<p><b>Chào Bạn '+res2[0].username+'</b><p>Nhấp vào đường link bên dưới để phục hồi lại mật khẩu</p><a href="'+process.env.SERVER_GMAIL_SEND_URL+'?username='+res2[0].username+'">https://sql316324.herokuapp.com/user/change-password</a></p>'
            }
            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                } else {
                    console.log('Message sent: ' + info.response);
                    res.redirect('/');
                }
            });
        }else{
            console.log('Message sent: email does not exist ');
            res.redirect('/');
        }
    });
}
exports.ChangePassword=(req,res,next)=>{
    const hashedPassword=bycrypt.createHash(req.body.password);
    if(req.body.old_password !== undefined){
       model.findByUsername(req.query.username).then(res2=>{
           if(bycrypt.isValidPassword(res2,req.body.old_password)){
               return model.UpdatePassword(req.query.username,hashedPassword);
           }else{
               return false;
           }
       }).then(res3=>{
           if(res3){
               req.logout();
               res.redirect('/user/login');
           }else{
               res.render('change_password',{error: "Mật khẩu không chính xác"});
           }
       });
    }else{
        model.UpdatePassword(req.query.username,hashedPassword).then(res3=>{
            req.logout();
            res.redirect('/user/login');
        });
    }
};
