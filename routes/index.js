const express = require('express');
const router = express.Router();

// Test routes
router.use('/test', require('./test/controller'));

module.exports = router;
