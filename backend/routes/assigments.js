const express = require('express');
const router = express.Router(); //{ mergeParams: true }

const { 
    newAssigment,
    getAllAssigments,
    searchAllAssigments,
    getAssigment,
    updateAssigment,
    deleteAssigment,
    createAssigmemntComment,
    getAssigmentComments,
    deleteComment,
    sortByLeaderAssigments,
    sortByEmpoloyeesAssigments,
    sortByEndDateAssigments,
    descByLeaderAssigments,
    descByEmpoloyeesAssigments,
    descByEndDateAssigments
} = require('../controllers/assigmentController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { upload } = require('../utils/fileHelper');

router.route('/assigment/create').post( isAuthenticatedUser, authorizeRoles('admin', 'manager'),  newAssigment);
router.route('/assignments').get(isAuthenticatedUser, authorizeRoles('admin', 'manager', 'user'), getAllAssigments);
router.route('/assigment/:id').get(isAuthenticatedUser,authorizeRoles('admin', 'manager', 'user'), getAssigment);
router.route('/admin/assigment/:id').put(isAuthenticatedUser,authorizeRoles('admin', 'manager', 'user'), updateAssigment);
router.route('/admin/assigment/:id').delete(isAuthenticatedUser,authorizeRoles('admin', 'manager'), deleteAssigment);

router.route('/assignments/search').get(isAuthenticatedUser, authorizeRoles('manager','user'), searchAllAssigments);
router.route('/sort/leader').get(isAuthenticatedUser,authorizeRoles('user'), sortByLeaderAssigments);
router.route('/sort/empolyee').get(isAuthenticatedUser,authorizeRoles('user'), sortByEmpoloyeesAssigments);
router.route('/sort/date').get(isAuthenticatedUser,authorizeRoles('user'), sortByEndDateAssigments);
router.route('/desc/leader').get(isAuthenticatedUser,authorizeRoles('user'), descByLeaderAssigments);
router.route('/desc/empolyee').get(isAuthenticatedUser,authorizeRoles('user'), descByEmpoloyeesAssigments);
router.route('/desc/date').get(isAuthenticatedUser,authorizeRoles('user'), descByEndDateAssigments);

router.route('/comment').put(isAuthenticatedUser, authorizeRoles('user', 'manager'), createAssigmemntComment);
router.route('/comments').get(isAuthenticatedUser, getAssigmentComments);	
router.route('/comments').delete(isAuthenticatedUser, authorizeRoles('manager', 'admin'), deleteComment);	



module.exports = router;