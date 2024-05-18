const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const verifyToken = require('../middleware/authmiddleware.js');
const router = express.Router();
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {origin: 'http://localhost:3000', credentials: true});
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);


router.post("", verifyToken,)

module.exports = router;
