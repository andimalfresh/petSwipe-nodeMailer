const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const port = process.env.PORT || 3001


app.listen(port, ()=> console.log(`Headed down the high way, looking for adventure on port: ${port}.`))

app.get("/", (req,res) => {
    res.send("YAAAAAS")
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.post("/send", (req,res) => {
    const output = `
    <p>You have a new message !</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Pet Name: ${req.body.pet_name}</li>
        <li>Location: ${req.body.location_city}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'petswipe@gmail.com', // generated ethereal user
                pass: 'petswipeorpetswipe' // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"PetSwipe App" <petswipe@gmail.com>', // sender address
            to: 'w.andrew.pedersen@gmail.com', // list of receivers
            subject: 'Someone is Interested in your pet !!', // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.render("contact", {msg: "Email has been sent!"})
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });

})