const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: "Gmail", // oder dein bevorzugter Mail-Dienst
    auth: {
        user: "dein_email@gmail.com",
        pass: "dein_app_passwort"
    }
});

app.post("/send-email", (req, res) => {
    const { recipient, message } = req.body;

    const mailOptions = {
        from: "dein_email@gmail.com",
        to: recipient,
        subject: "Neue Nachricht",
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send({ success: false });
        } else {
            res.send({ success: true });
        }
    });
});

app.listen(3000, () => {
    console.log("Server läuft auf Port 3000");
});
