const mongoose = require('mongoose');

const assigmentSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please enter title'],
		trim: true,
		maxLength: [191, 'Title can not be greater than 191 characters'],
	},
	description: {
		type: String,
		required: [true, 'Please enter an assigment description'],
	},
    creatorId:  {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
	creatorFullName: {
		type: mongoose.Schema.Types.String,
		ref: 'User',
		required: true,
	},
	
    startingAt: {
		type: Date,
		default: Date.now()
	},
    finishingAt: {
        type: Date,
    },
	priority: {
		type: Number,
		required: [true, 'Please enter priority!'],
        min: 1,
		max: 10
	},
	status: {
		type: String,
		required: true,
		default: 'In progress',
	},
	group:  {
		type: String,
		required: true,	
	},
	
	firstEmployee: {
		type: String,
		required: true,	
	},
	secondEmployee: {
		type: String,
	},
	thirdEmployee: {
		type: String,
	},
	
	// employees: {
		
	// 		user: {
	// 			type: mongoose.Schema.ObjectId,
	// 			ref: 'User',
	// 			required: true,
	// 		},
	// 		fullName: {
	// 			type: mongoose.Schema.Types.String,
	// 			ref: 'User',
	// 			required: true,
	// 		},
	// 		username: {
	// 			type: mongoose.Schema.Types.String,
	// 			ref: 'User',
	// 			required: true,
	// 		},
		
	// },
	file: {
		public_id: {
			type: String,
		},
		url: {
			type: String,
		},
	},
    
	comments: [
		{
			user: {
				type: mongoose.Schema.ObjectId,
				ref: 'User',
				required: true,
			},
			fullName: {
				type: String,
				required: true,
			},
			commentBody: {
				type: String,
				required: true,
			},
			createdAt: {
				type: Date,
				default: Date.now,
			},
		},
	],
	
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Assigment', assigmentSchema);