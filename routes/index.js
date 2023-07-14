var express = require('express');
var router = express.Router();
const IP = require('ip'); //get client ip
var database = require('../database');
const fs = require('fs');


const http = require('http');
const url = require('url');

/* GET home page. */
router.post('/user-info', function (req, res, next) {

      // ----------- user tracking regiter --------------

      const ipAddress = IP.address();

      const device = req.device.type.toLowerCase();

      var date_ob = new Date();
      var day = ("0" + date_ob.getDate()).slice(-2);
      var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      var year = date_ob.getFullYear();
      var date = year + "-" + month + "-" + day;
      var hours = date_ob.getHours();
      var minutes = date_ob.getMinutes();
      var seconds = date_ob.getSeconds();
      var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        
       // res.send("not exist");
        var sql3 = `
                            INSERT INTO platform 
                            (ip, platform, logintime) 
                            VALUES ("${ipAddress}", "${device}", "${dateTime}")
                            `;
        database.query(sql3, function (error, data3) {

          if (error) {
            throw error;
          }
          else {
             res.send("save ok");
            
          }
  // end add user tracking
        });
});


router.get('/', function (req, res, next) {
  // var sesLogin = req.session.sesUser
  // // Variable exists and is not null or undefined
  // res.render('adminLogin', { action: 'empty', title: 'Admin login page', sesLogin: sesLogin });
  res.redirect('/admin');

});



router.get('/login/:user', function (req, res, next) {

   var user = req.params.user;
  // var ip = req.params.ip;
  // var logintime = req.body.logintime;
  // // var logintime = req.body.logintime;

  // // var sesLogin = req.session.sesUser
  // // // Variable exists and is not null or undefined
  // // res.render('adminLogin', { action: 'empty', title: 'Admin login page', sesLogin: sesLogin });
  res.send(user);

  




});
router.post('/login/:user/:ip/:platform/:logintime', function (req, res, next) {

  var user = req.params.user;
  var ip = req.params.ip;
  var platform = req.params.platform;
  var logintime = req.params.logintime;
  
  var sql = `
                            INSERT INTO platform 
                            (user, ip, platform, logintime) 
                            VALUES ("${user}", "${ip}", "${platform}", "${logintime}")
                            `;
        database.query(sql, function (error, data) {

          if (error) {
            throw error;
          }
          else {
             res.send("save ok");
            
          }

        });

 // res.send(user+ip+platform+logintime);

});

router.post('/logout/:user/:ip/:platform/:logintime/:logouttime', function (req, res, next) {

  var user = req.params.user;
  var ip = req.params.ip;
  var platform = req.params.platform;
  var logintime = req.params.logintime;
  var logouttime = req.params.logouttime;
  
  var query = `
        UPDATE platform 
        SET logouttime = "${logouttime}"
        
        WHERE user = "${user}" AND logintime="${logintime}"
        `;
        database.query(query, function (error, data) {

          if (error) {
            throw error;
          }
          else {
             res.send("save ok");
            
          }

        });

 // res.send(user+ip+platform+logintime);

});



router.post('/logged', function (req, res, next) {
  
  var fUsername = req.body.user;
  var fPassword = req.body.pass;
  const query = `SELECT * FROM user where username="${fUsername}" and password="${fPassword}" `;
  database.query(query, function (error, data) {
    if (error) {
      throw error;
    }
    else {
      var total_records = data.length;
      if (total_records > 0) {
        var sesLogin = req.session.sesUser = 'admin';
       // res.send('ok');
        //res.render('admin', { title: 'Volvo Portal', dataPage: dataPage, sesLogin: sesLogin });
        res.redirect('/admin');
      }
      else {
        //res.send('not ok');
        var sesLogin = req.session.sesUser = '';
       res.render('adminLogin', { title: 'Admin login page',  action: "login",sesLogin: sesLogin  });
      }
    }
  });


  //   var username = req.session.sesUser = 'admin';

  //  res.render('index',{title: 'Volvo Portal', sesUser: username});
});



router.get('/logout', function (req, res, next) {

  delete req.session.sesUser;
  res.redirect('/');

});





router.get('/admin', function (req, res, next) {

  // var sesLogin = req.session.sesUser;
  // if (sesLogin) {
    var page = 1;
    var sql = "SELECT * FROM platform";
    database.query(sql, function (error, data) {
      if (error) {
        throw error;
      }
      else {
        var per_page_record = 5;
        var total_records = data.length;
        var total_pages = Math.round(total_records / per_page_record);
        var start_from = (page - 1) * per_page_record;
        var sqlpage = `SELECT * FROM platform ORDER BY id DESC LIMIT ${start_from}, ${per_page_record}`;

        database.query(sqlpage, function (error, dataPage) {
          if (error) {
            throw error;
          }
          else {
            res.render('admin', { title: 'User Tracking System', action: 'list', dataPage: dataPage, total_pages: total_pages, page: page});
          }
        });

      }
    });
  // }
  // else {
  //   res.redirect('/');
  // }

});


router.get('/admin/:page', function (req, res, next) {
  // var sesLogin = req.session.sesUser;
  
  // if(sesLogin =='admin')
  // {
  var page = req.params.page;
  var sql = "SELECT * FROM platform";
  database.query(sql, function (error, data) {
    if (error) {
      throw error;
    }
    else {
      var per_page_record = 5;
      var total_records = data.length;
      var total_pages = Math.round(total_records / per_page_record);
      var start_from = (page - 1) * per_page_record;
      var sqlpage = `SELECT * FROM platform ORDER BY id DESC LIMIT ${start_from}, ${per_page_record}`;

      database.query(sqlpage, function (error, dataPage) {
        if (error) {
          throw error;
        }
        else {
          res.render('admin', { title: 'User Tracking System', action: 'paging', dataPage: dataPage, total_pages: total_pages, page: page });
        }
      });
    }
  });
// }else{
//   res.send("Login please!");
// }

});








router.post('/log-exit-time', function (req, res, next) {
  var lastId = req.session.lastID;

  var date_ob = new Date();
  var day = ("0" + date_ob.getDate()).slice(-2);
  var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  var year = date_ob.getFullYear();
  var date = year + "-" + month + "-" + day;
  var hours = date_ob.getHours();
  var minutes = date_ob.getMinutes();
  var seconds = date_ob.getSeconds();
  var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

  var query = `
UPDATE platform 
SET logouttime = "${dateTime}" 
WHERE id = "${lastId}"
`;

  database.query(query, function (error, data) {
    if (error) {
      throw error;
    }
    else {
      //res.send(query);
      req.session.destroy();
      // delete req.session.lastID;
      res.redirect('/');
    }
  });

});


// sort
router.get('/sort/', function(req, res, next) {
  
  var page = 1;
var sql = "SELECT * FROM platform ORDER BY id ASC";
database.query(sql, function (error, data) {
  if (error) {
    throw error;
  }
  else {
    var per_page_record = 5;
    var total_records = data.length;
    var total_pages = Math.round(total_records / per_page_record);
    var start_from = (page - 1) * per_page_record;
    var sqlpage = `SELECT * FROM platform ORDER BY id ASC LIMIT ${start_from}, ${per_page_record}`;

    database.query(sqlpage, function (error, dataPage) {
      if (error) {
        throw error;
      }
      else {
        res.render('sort', { title: 'User Tracking System',  dataPage: dataPage, total_pages: total_pages, page: page });
      }
    });

  }
});
});


router.get('/sort/:page', function (req, res, next) {

  var page = req.params.page;
  

  var sql = "SELECT * FROM platform ORDER BY id ASC";
  database.query(sql, function (error, data) {
    if (error) {
      throw error;
    }
    else {
      var per_page_record = 5;
      var total_records = data.length;
      var total_pages = Math.round(total_records / per_page_record);
      var start_from = (page - 1) * per_page_record;
      var sqlpage = `SELECT * FROM platform ORDER BY id ASC LIMIT ${start_from}, ${per_page_record}`;

      database.query(sqlpage, function (error, dataPage) {
        if (error) {
          throw error;
        }
        else {
          res.render('sort', { title: 'User Tracking System',  dataPage: dataPage, total_pages: total_pages, page: page });
        }
      });
    }
  });
});
//end sort

router.get('/editor', function (req, res, next) {

   res.render('testeditor',{title:'Editor page'});
  // --------------------
});




module.exports = router;
