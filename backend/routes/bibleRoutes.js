// routes/bibleRoutes.js
const express = require('express');
const router = express.Router();
const bibleController = require('../controllers/bibleController');

router.get('/', bibleController.searchVerses);

module.exports = router;
