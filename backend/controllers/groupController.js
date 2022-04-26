const Group = require('../models/group');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// create new group => /api/v1/group/new
exports.newGroup = catchAsyncErrors (async ( req, res, next ) => {

	
	req.body.user = req.user._id;
	req.body.fullName=req.user.fullName;
	
    const group = await Group.create(req.body);

    res.status(201).json({
        success: true,
        group
    })
})

// get all groups => /api/v1/groups
exports.getAllGroups = catchAsyncErrors (async (req, res, next) => {
    const groups = await Group.find();

    res.status(200).json({
        success: true,
        count: groups.length,
        groups
    })
})

// get single group => /api/v1/group/:id
exports.getGroup = catchAsyncErrors (async (req, res, next) => {
    const group = await Group.findById(req.params.id);

	if (!group) {
        
		return next(new ErrorHandler('Group not found', 404));
	}

	res.status(200).json({
		success: true,
		group
	});
})

// update group /api/v1/admin/group/:id
exports.updateGroup = catchAsyncErrors (async (req, res, next) => {

    let group = await Group.findById(req.params.id);

    if (!group) {
        
		return next(new ErrorHandler('Group not found', 404));
	}

    group = await Group.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		group
	});
});

// delete group => /api/v1/admin/group/:id
exports.deleteGroup = catchAsyncErrors (async (req, res, next) => {
	const { id } = req.params;
	const group = await Group.findById(id);
	

	if (!group) {
        
		return next(new ErrorHandler('Group not found', 404));
	}

	await group.remove();

	res.status(200).json({
		success: true,
		message: 'Group deleted!',
	});
});