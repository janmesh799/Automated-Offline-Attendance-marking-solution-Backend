const nodemailer = require('nodemailer');

const sendEmail = (emailId, token,userType) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASS
        }
    });
    let api = "";
    if(userType === 'teacher'){
        api  = "api/teacher/resetforgotpassword/"
    }
    else if(userType === 'student'){
        api =  "api/student/resetforgotpassword/"
    }
    const message = `
    <body>
    <div>
        <h3>Password Resetting Link for your account at Upasthit</h3>
        </br>
        <div>
            <p>
                please <a href=${process.env.HOST}${api}${token}"> click here </a> to reset your password or click
                below mentioned link
            </p>
            </br>
            </br>
            <span>
            ${process.env.HOST}${api}${token}
            </span>
        </div>
    </div>
</body>
    `
    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: emailId,
        subject: `password resetting link`,
        // text:,
        html: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendEmail;