const nodemailer = require('nodemailer')

const sendMail = async (data) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "kk1077171@gmail.com",
            pass: "nkuwsozknftbiwwf"
        }
    })

    const mailOptions = {
        from: `Shopping <kk1077171@gmail.com>`,
        to: data.email,
        subject: data.subject,
        text: data.text
    }

    await transporter.sendMail(mailOptions)
}

module.exports = sendMail