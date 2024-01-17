const nodemailer = require('nodemailer');


exports.contactMe = async (req, res) => {
    try {

      const {name, email, website, text } = req.body;

      if (!name || !email || !text) {
        return res.status(400).json({ message: "All fields are required." });
      }

      await sende(name,email, website, text);
      res.status(200).json({ message: "Email sent successfully." });
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: error.message });
    }
}


async function sende(name, email, subject, message) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "chris.chitay@gmail.com",
            pass: "ycbd hjel ptxp ccel",
        },
    });

    let htmlBody = `<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>J & C LA Studios</title>
        </head>
        <body>
            <h3>Your message information:</h3>
            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Message:</strong> ${message}</li>
            </ul>
            <p>Thank you for reaching us. We will be contacting you as soon as possible.</p>
        </body>
        </html>`;


    let info = {
        from: `J & C LA Studios <info@jclastudios.com>`, // dirección del remitente
        to: [email, "jose.chitay@jclastudios.com"], // lista de receptores (cliente y dirección de destino)
        subject: subject, // línea de asunto
        html: htmlBody, // cuerpo HTML del correo electrónico
    };

    try {
        const result = await transporter.sendMail(info);
        console.log("Email sent successfully: " + result.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
    
}

  