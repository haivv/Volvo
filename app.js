var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var sortRouter = require('./routes/sort');
var unityRouter = require('./routes/unity');
var noticeRouter = require('./routes/notice');

var session = require('express-session');

var app = express();


////chen anh

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

// Route  upload image
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
      return res.status(500).send('Please upload a file');
  }
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});



app.use(session({
  secret : 'key',
  resave : true,
  saveUninitialized : true
}));

var express = require('express');
var device = require('express-device');
app.use(device.capture()); //get device client

const bodyParser = require('body-parser');//close tab
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/sort', sortRouter);
app.use('/unity', unityRouter);
app.use('/notice', noticeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
