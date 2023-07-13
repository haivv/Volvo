var express = require('express');
var router = express.Router();
const IP = require('ip'); //get client ip
var database = require('../database');

router.get('/', function (req, res, next) {
   
   
                var sql2 = "SELECT * FROM platform  ORDER BY id DESC LIMIT 1";
                database.query(sql2, function (error, data2) {
                    if (error) {
                        throw error;
                    }
                    else {
                        var lastid = data2[0].id;
                        var sesID1 = req.session.lastID = lastid + 1;

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
                                // res.send("ok");
                                res.render('unityLogged', { title: 'Visitor page', sesion: sesID1 });
                            }
                        });
     
                    }
                });


           
  

    //   var username = req.session.sesUser = 'admin';

    //  res.render('index',{title: 'Volvo Portal', sesUser: username});
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
            delete req.session.lastID;
            res.redirect('/unity');
        }
    });

});





module.exports = router;
