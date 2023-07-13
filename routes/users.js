var express = require('express');
const http = require('http');
const IP = require('ip'); //get client ip
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/add', function(req, res, next) {
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  res.send(time);

});

router.get('/getip', function(req, res, next) {
  // res.render('user', { title: 'User Tracking System'});
  // const ipAddress = req.socket.remoteAddress;
  // res.send(ipAddress);
  // // you'll see '::1' => '127.0.0.1'

  const ipAddress = IP.address();
  res.send(ipAddress) //--192.168.0.51--

 // res.send(req.device.type.toUpperCase()+req.device.type.toLowerCase()); //--get device

});

router.get('/time', function(req, res, next) {
  var date_ob = new Date();
  var day = ("0" + date_ob.getDate()).slice(-2);
  var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  var year = date_ob.getFullYear();
    
  var date = year + "-" + month + "-" + day;
  console.log(date);
      
  var hours = date_ob.getHours();
  var minutes = date_ob.getMinutes();
  var seconds = date_ob.getSeconds();
    
  var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  res.send(dateTime);

});

router.get('/timeout', function(req, res, next) {
  res.render('timeout', { title: 'User Tracking System'});

});

router.post('/log-exit-time', function(req, res) {
  // Lưu thời gian thoát từ req.body.exitTime vào cơ sở dữ liệu hoặc tệp log
 // var timeStr  =  req.body.exitTime;

 var date_ob = new Date();
 var day = ("0" + date_ob.getDate()).slice(-2);
 var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
 var year = date_ob.getFullYear();
   
 var date = year + "-" + month + "-" + day;
 console.log(date);
     
 var hours = date_ob.getHours();
 var minutes = date_ob.getMinutes();
 var seconds = date_ob.getSeconds();
   
 var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

 console.log('Exit time:', dateTime);
 // console.log('Exit time:', toTimestamp(timeStr));
 // console.log('Exit time:', req.body.exitTime);
  // Trả về phản hồi thành công
  res.sendStatus(200);
});


router.post('/login', function(req, res, next){

  // var user_email_address = req.body.user_email_address;

  // var user_password = req.body.user_password;
  // var timeStr = "1687307568934";
  // var timeFinal  = new Date(timeStr);
  // timeFinal = timeFinal.toISOString()

  var date_ob = new Date();
  var day = ("0" + date_ob.getDate()).slice(-2);
  var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  var year = date_ob.getFullYear();
    
  var date = year + "-" + month + "-" + day;
  console.log(date);
      
  var hours = date_ob.getHours();
  var minutes = date_ob.getMinutes();
  var seconds = date_ob.getSeconds();
    
  var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  res.send(dateTime);
  
 
      
  

});

module.exports = router;
