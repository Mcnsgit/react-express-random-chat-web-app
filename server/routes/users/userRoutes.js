const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware'); // Assuming you have an auth middleware

router.post('/find-match', protect, matchController.findMatchForUser);

module.exports = router;
