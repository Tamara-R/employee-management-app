const express = require('express');
const router = express.Router();

// function imports
const { 
    newGroup,
    getAllGroups,
    getGroup,
    updateGroup,
    deleteGroup
} = require('../controllers/groupController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/group/create').post(isAuthenticatedUser, authorizeRoles('admin', 'manager'), newGroup);
router.route('/groups').get(isAuthenticatedUser, authorizeRoles('admin', 'manager', 'user'), getAllGroups);
router.route('/group/:id').get(isAuthenticatedUser, authorizeRoles('admin', 'manager', 'user'), getGroup);
router.route('/admin/group/:id').put(isAuthenticatedUser, authorizeRoles('admin', 'manager'), updateGroup);
router.route('/admin/group/:id').delete(isAuthenticatedUser,authorizeRoles('admin', 'manager'), deleteGroup);



module.exports = router;