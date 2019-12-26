const nodeMailer=require('nodemailer');
const model=require('../Models/UsersModel');
exports.ConfirmPassword = (req, res, next) =>{
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
        to: req.user.email,
        subject: 'Xác nhận Email',
        text: 'Bạn nhân được mail từ ' + req.user.email,
        html: '<p><b>Chào Bạn '+req.user.username+'</b><p>Nhấp vào đường link bên dưới để xác nhận email</p><a href="'+process.env.SERVER_CONFIRM_GMAIL_SEND_URL+'?username='+req.user.username+'">https://sql316324.herokuapp.com/user/confirm_email</a></p>'
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
    res.render('confirm_email');
};

exports.ConfirmPasswordCallBack=(req,res,next)=>{
    model.UpdateActive(req.query.username);
    res.render('confirm_email_callback');
}