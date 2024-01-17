var express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

const mailRouter = require('./router/mail.router');

app.use('/api/user', mailRouter);

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the application.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

14 