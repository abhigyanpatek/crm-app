const userController = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

router.get("/", [verifyToken, isAdmin], userController.getAllUser);
router.get("/:id", [verifyToken, isAdmin], userController.getUserById);
router.put("/:id", [verifyToken, isAdmin], userController.updateUser);

module.exports = router;