const express = require('express');
const router = express.Router();

const mailController = require('../controller/mail.controller');

router.post('/contact', mailController.contactMe);

module.exports = router;
