const Assigment = require('../models/assigment');
const Group = require('../models/group');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');

// create new assigment => /api/v1/assigment/create
exports.newAssigment = catchAsyncErrors (async ( req, res, next ) => {

	const result = await cloudinary.v2.uploader.upload(req.body.file, {
		folder: 'files'
	});

    // req.body.group = await Group.findById(req.body.group)
	// req.body.groupName = await Group.findOne(req.body.name)
    // console.log(req.body.group)
	req.body.creatorId = req.user._id;
	req.body.creatorFullName = req.user.fullName
	req.body.file =  {
		public_id: result.public_id,
		url: result.secure_url,
		
	}


    const assigment = await Assigment.create(req.body);

    res.status(201).json({
        success: true,
        assigment
    })
})

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

// get all assigments => /api/v1/assigments
exports.getAllAssigments = catchAsyncErrors (async (req, res, next) => {

    const assigmentCount = await Assigment.countDocuments();

    const apiFeatures = new APIFeatures(Assigment.find(), req.query)
                        .search()
                        .filter()

    // const assigments = await Assigment.find();
    const assigments = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: assigments.length,
        assigmentCount,
        assigments
    })
})

exports.searchAllAssigments = catchAsyncErrors (async (req, res, next) => {

    const resPerPage = 3;
    const assigmentCount = await Assigment.countDocuments();

    const apiFeatures = new APIFeatures(Assigment.find(), req.query)
                        .search()
                        .filter()
						.pagination(resPerPage);

    const assigments = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: assigments.length,
        assigmentCount,
        resPerPage,
        assigments
    })
})

exports.sortByLeaderAssigments = catchAsyncErrors (async (req, res, next) => {

    const resPerPage = 3;
    const assigmentCount = await Assigment.countDocuments();

    const apiFeatures = new APIFeatures(Assigment.find().sort({'creatorFullName': 'asc'}), req.query)
                        .search()
                        .filter()
						.pagination(resPerPage);

    const assigments = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: assigments.length,
        assigmentCount,
        resPerPage,
        assigments
    })
})

exports.sortByEmpoloyeesAssigments = catchAsyncErrors (async (req, res, next) => {

    const assigmentCount = await Assigment.countDocuments();

    const apiFeatures = new APIFeatures(Assigment.find().sort({'firstEmployee':'asc'}), req.query)
                        .search()
                        .filter()

    // const assigments = await Assigment.find();
    const assigments = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: assigments.length,
        assigmentCount,
        assigments
    })
})

exports.sortByEndDateAssigments = catchAsyncErrors (async (req, res, next) => {

    const assigmentCount = await Assigment.countDocuments();

    const apiFeatures = new APIFeatures(Assigment.find().sort({'finishingAt':'asc'}), req.query)
                        .search()
                        .filter()

    // const assigments = await Assigment.find();
    const assigments = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: assigments.length,
        assigmentCount,
        assigments
    })
})

exports.descByLeaderAssigments = catchAsyncErrors (async (req, res, next) => {

    const resPerPage = 3;
    const assigmentCount = await Assigment.countDocuments();

    const apiFeatures = new APIFeatures(Assigment.find().sort({'creatorFullName': 'desc'}), req.query)
                        .search()
                        .filter()
						.pagination(resPerPage);

    const assigments = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: assigments.length,
        assigmentCount,
        resPerPage,
        assigments
    })
})

exports.descByEmpoloyeesAssigments = catchAsyncErrors (async (req, res, next) => {

    const assigmentCount = await Assigment.countDocuments();

    const apiFeatures = new APIFeatures(Assigment.find().sort({'firstEmployee':'desc'}), req.query)
                        .search()
                        .filter()

    
    const assigments = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: assigments.length,
        assigmentCount,
        assigments
    })
})

exports.descByEndDateAssigments = catchAsyncErrors (async (req, res, next) => {

    const assigmentCount = await Assigment.countDocuments();

    const apiFeatures = new APIFeatures(Assigment.find().sort({'finishingAt':'desc'}), req.query)
                        .search()
                        .filter()

    
    const assigments = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: assigments.length,
        assigmentCount,
        assigments
    })
})

// get single assigment => /api/v1/assigment/:id
exports.getAssigment = catchAsyncErrors (async (req, res, next) => {

    const assigment = await Assigment.findById(req.params.id);

	if (!assigment) {
       
		return next(new ErrorHandler('Assigment not found', 404));
	}

	res.status(200).json({
		success: true,
		assigment
	});
})

// update assigment  => /api/v1/admin/assigment/:id
exports.updateAssigment = catchAsyncErrors (async (req, res, next) => {
	const newData = {
		title: req.body.title,
		description: req.body.description,
		priority: req.body.priority,
		status: req.body.status,
		
	};
    

   	const assigment = await Assigment.findByIdAndUpdate(req.params.id, newData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		assigment
	});
})

// delete assigment => /api/v1/admin/assigment/:id
exports.deleteAssigment = catchAsyncErrors (async (req, res, next) => {

	const { id } = req.params;
	const assigment = await Assigment.findById(id);
	

	if (!assigment) {
        
		return next(new ErrorHandler('Assigment not found', 404));
	}

	await assigment.remove();

	res.status(200).json({
		success: true,
		message: 'Assigment deleted!',
	});
});



// update assigment status - user=> /api/v1/assigment/task/:id
exports.updateAssigmentTaskStatus = catchAsyncErrors(async (req, res, next) => {

	const assigment = await Assigment.findById(req.params.id);

	if (assigment.task.status === 'Finished') {
		return next(new ErrorHandler('This task is already finished!', 400));
	}

	assigment.task.status = req.body.task.status;

	await assigment.save();

	res.status(200).json({
		success: true,
        assigment

	});
});


// create new / update comment - user => /api/v1/comment
exports.createAssigmemntComment = catchAsyncErrors(async (req, res, next) => {

	const { commentBody, assigmentId } = req.body;

	const comment = {
		user: req.user._id,
		fullName: req.user.fullName,
		commentBody
	};

	const assigment = await Assigment.findById(assigmentId);

	assigment.comments.push(comment);
	assigment.numOfComments = assigment.comments.length;
	await assigment.save({ validateBeforeSave: false });


	res.status(200).json({
		success: true,
		comment
	});
});

// get specific assigment coments -> /api/v1/comments?id=
exports.getAssigmentComments = catchAsyncErrors(async (req, res, next) => {
	const assigment = await Assigment.findById(req.query.id);

	res.status(200).json({
		success: true,
		comments: assigment.comments,
	});
});


// delete comment => /api/v1/comments?id=
exports.deleteComment = catchAsyncErrors(async (req, res, next) => {

	const assigment = await Assigment.findById(req.query.assignmentId);

	const comments = assigment.comments.filter(
		comment => comment._id.toString() !== req.query.id.toString()
	);

	const numOfComments = comments.length;


	await Assigment.findByIdAndUpdate(
		req.query.assignmentId,
		{
			comments,
			numOfComments,
		},
		{
			new: true,
			
		}
	);

	res.status(200).json({
		success: true,
	});
});


