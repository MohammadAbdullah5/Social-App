// Call these routes in the server.js

const express = require("express");
const router = express.Router();
const { signin, signout } = require('../controllers/authController');

router.post('/auth/signin', signin);
router.get('/auth/signout', signout);

module.exports = router;