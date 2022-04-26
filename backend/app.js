const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errors');

dotenv.config({
    path: './config/.env'
});

//middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());



const groups = require('./routes/groups');
const assigments = require('./routes/assigments');
const auth = require('./routes/auth');


// app routes
app.use('/api/v1', groups);
app.use('/api/v1', assigments);
app.use('/api/v1', auth);


// has to be in the end
app.use(errorMiddleware);

module.exports = app;


