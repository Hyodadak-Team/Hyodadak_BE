const express = require('express');

const {test} = require('../controllers/testController')

const router = express.Router();

router.post('/', test);

module.exports = router;