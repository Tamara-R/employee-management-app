const express = require('express');

const router = express.Router();

const { 
    registerUser, 
    loginUser,
    logout, 
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    newUser,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser,
    verifyUser,
    sendConfirmationEmail
} = require('../controllers/authController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


// auth routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/myprofile').get(isAuthenticatedUser, getUserProfile);
router.route('/myprofile/update').put(isAuthenticatedUser, updateProfile);

router.route('/account/email').post(sendConfirmationEmail);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);


router.route('/account/verify/:token').get(verifyUser);


router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin', 'manager', 'user'), allUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails);
router.route('/admin/user/create').post(isAuthenticatedUser, authorizeRoles('admin'), newUser);
router.route('/admin/user/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateUser);
router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);


module.exports = router;