const authController = require('../controllers/auth.controller');
const { validateUserReqBody } = require('../middlewares/verifyUserReqBody');
const express = require('express');
const router = express.Router();

router.post("/signup", validateUserReqBody, authController.signUp);
router.post("/signin", authController.signIn);

module.exports = router;