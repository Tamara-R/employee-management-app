const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    name: {
		type: String,
		required: [true, 'Please enter group name'],
		trim: true,
		maxLength: [191, 'Group name cannot exceed 191 characters'],
	},
	field: {
		type: String
	},
	description: {
		type: String
	},
	status: {
		type: String,
		default: "Active"
	},
	user: { 
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},	
	fullName: {
		type: mongoose.Schema.Types.String,
		ref: 'User',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('Group', groupSchema);