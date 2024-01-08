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
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contacto desde el sitio web</title>
    </head>
    <body>
        <h1>Contacto desde el sitio web</h1>
        <p>Has recibido un mensaje de un visitante del sitio web con la siguiente información:</p>
        <ul>
            <li><strong>Nombre:</strong> ${name}</li>
            <li><strong>Correo electrónico:</strong> ${email}</li>
            <li><strong>Mensaje:</strong> ${message}</li>
        </ul>
        <p>Por favor, responde a este mensaje lo antes posible.</p>
    </body>
    </html>`;

    let info = {
        from: `J & C LA Studios <${email}>`, // dirección del remitente
        to: email, // lista de receptores
        subject: subject, // línea de asunto
        html: htmlBody, // cuerpo HTML del correo electrónico
    };

    try {
        const result = await transporter.sendMail(info);
        console.log("Correo electrónico enviado correctamente: " + result.response);
    } catch (error) {
        console.error("Error al enviar el correo electrónico:", error);
    }
}

  