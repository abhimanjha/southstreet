const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    register,
    login,
    adminLogin,
    getMe,
    updateProfile
} = require('../controllers/authController');
const { googleAuth } = require('../controllers/googleAuthController');
const {
    registerValidation,
    loginValidation
} = require('../utils/validators');

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/admin/login', loginValidation, adminLogin);
router.post('/google', googleAuth);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
