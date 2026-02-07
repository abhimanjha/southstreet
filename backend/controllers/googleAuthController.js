const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const { generateToken } = require('../utils/generateToken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Verify Google token and login/register user
// @route   POST /api/auth/google
// @access  Public
const googleAuth = async (req, res, next) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                success: false,
                message: 'Google credential is required'
            });
        }

        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, given_name, family_name, picture } = payload;

        // Check if user exists with this Google ID
        let user = await User.findOne({ where: { googleId } });

        if (!user) {
            // Check if user exists with this email
            user = await User.findOne({ where: { email } });

            if (user) {
                // Link Google account to existing user
                user.googleId = googleId;
                await user.save();
            } else {
                // Create new user
                user = await User.create({
                    googleId,
                    email,
                    firstName: given_name || 'User',
                    lastName: family_name || '',
                    password: null, // No password for Google users
                    role: 'user'
                });
            }
        }

        // Generate JWT token
        const token = generateToken(user.id);

        res.json({
            success: true,
            message: 'Google authentication successful',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                },
                token
            }
        });
    } catch (error) {
        console.error('Google auth error:', error);
        next(error);
    }
};

module.exports = {
    googleAuth
};
