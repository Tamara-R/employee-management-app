const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please enter your username!'],
		maxLength: [20, 'Username has to be less than 20 characters!'],
        unique: true,
	},
	email: {
		type: String,
		required: [true, 'Please enter your email!'],
		unique: true,
		validate: [validator.isEmail, 'Please enter a valid email address!'],
	},
	password: {
		type: String,
		required: [true, 'Please enter your password!'],
		minlength: [4, 'Password must be at least 4 characters!'],
		select: false, 
	},
    fullName: {
		type: String,
		required: [true, 'Please enter your full name!'],
		maxLength: [50, 'Full Name has to be less than 50 characters!'],
	},
    phoneNo: {
		type: String,
	},
    dateOfBirth: {
		type: String,
	},
	avatar: {
		public_id: {
			type: String,
		},
		url: {
			type: String,
		},
	},
	role: {
		type: String,
		default: 'user',
	},
	status: {
		type: String,
		default: 'pending',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	confirmationToken: String,
	confirmationExpire: Date,
	activationToken: String,
	activationTokenExpire: Date
});

//encrypt password before saving user
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

//compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// //return jwt token
userSchema.methods.getJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_TIME,
	});
};


// generate password reset token
userSchema.methods.getResetPasswordToken = function () {
	
	//generate the token
	const resetToken = crypto.randomBytes(20).toString('hex');

	//hash and set to resetPasswordToken 
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	//set token to expire
	this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

	return resetToken;
};

userSchema.methods.getActivationToken = function () {
	
	//generate the token
	const resetToken = crypto.randomBytes(20).toString('hex');

	//hash and set to activationToken
	this.activationToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	//set token to expire
	this.activationTokenExpire = Date.now() + 30 * 60 * 1000;

	return resetToken;
};

userSchema.methods.getConfirmationToken = function () {
	
	//generate the token
	const resetToken = crypto.randomBytes(20).toString('hex');

	//hash and set to resetPasswordToken 
	this.confirmationToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	//set token to expire
	this.confirmationExpire = Date.now() + 30 * 60 * 1000;

	return resetToken;
};



module.exports = mongoose.model('User', userSchema);