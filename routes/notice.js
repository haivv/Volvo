var express = require('express');
var router = express.Router();
const IP = require('ip'); //get client ip
var database = require('../database');
const fs = require('fs');
var multer = require('multer');
var createError = require('http-errors');
var path = require('path');


router.get('/', function (req, res, next) {

    var ses = req.session.sesWriter;
    var page = 1;
    var sql = "SELECT * FROM notice";
    // res.send(sql);
    database.query(sql, function (error, data) {
        if (error) {
            throw error;
        }
        else {
            var per_page_record = 5;
            var total_records = data.length;
            var total_pages = Math.ceil(total_records / per_page_record);
            var start_from = (page - 1) * per_page_record;
            var sqlpage = `SELECT * FROM notice ORDER BY id DESC LIMIT ${start_from}, ${per_page_record}`;

            database.query(sqlpage, function (error, dataPage) {
                if (error) {
                    throw error;
                }
                else {
                    res.render('notice', { title: 'Notice', dataPage: dataPage, total_pages: total_pages, page: page });
                }
            });

        }
    });



});

router.get('/getWriter/:writer', function (req, res, next) {
    var writer = req.params.writer;

    req.session.sesWriter = writer;
    //var username = req.session.sesWriter;
    // res.send(``);
    res.redirect('/notice/updateComment');
    // res.send(req.session.sesWriter)
    // var sesWriter = req.session.sesWriter;
    // res.redirect('/notice?param=${sesWriter}');
    // res.send(req.session.sesWriter);
    // Data
    // const data = {
    //   name: writer,
    // };
    // // Convert to JSON object
    // const jsonData = JSON.stringify(data);
    // // Ghi dữ liệu vào tệp JSON
    // fs.writeFile('user.json', jsonData, 'utf8', (err) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log('Added to JSON.');
    //   }
    // });

});



router.get('/notice_add', function (req, res, next) {
    var writer = req.session.sesWriter;
    // res.send(writer);
    res.render('notice_add', { title: 'Notice', writer:writer });
});

router.get('/notice_edit/:id', function (req, res, next) {
    var id = req.params.id;

    var query = `SELECT * FROM notice WHERE id = "${id}"`;

    database.query(query, function (error, data) {

        res.render('notice_edit', { title: 'Notice', Data: data, id: id, sesWriter: req.session.sesWriter });
    });
});


// Upload file
// // SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads');
    },
    filename: function (req, file, callback) {

    

        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');

      
       
        var additionName = req.session.sesWriter + '_';

        var uniqueFileName = additionName +  file.originalname;


        callback(null, uniqueFileName);
    }
});


var upload = multer({ storage: storage }).single('myfile');


router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

//upload file
router.post('/uploadfile', (req, res) => {

    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        console.log("File is uploaded successfully!");
    });


});




router.post('/proAddNotice', function (req, res, next) {
   
    //add datetime to file name
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var dateTime = year + month + day + '_';

    const { content, searchoption, txttitle,txtfileupload } = req.body;
    

    var txtTitle = txttitle;
    var txtContent = content;
    var txtWrite = req.session.sesWriter;
    if(txtWrite==''){
        txtWrite = 'undefined';
    }
    var fileUpload = txtfileupload;

    var additionName = req.session.sesWriter + '_';
    var dateString = year + '-' + month + '-' + day;

    var txtOption = '';
    if (searchoption == 'op1') {
        txtOption = "Announcement";
    } else if (searchoption == 'op2') {
        txtOption = "Suggestion";
    } else if (searchoption == 'op3') {
        txtOption = "Opinion";
    } else if (searchoption == 'op4') {
        txtOption = "Request";
    } else if (searchoption == 'op5') {
        txtOption = "Reference";
    }


    if (typeof fileUpload !== 'undefined') {
        fileUpload = fileUpload.trim();
        if (fileUpload != '') {
            fileUpload = fileUpload;
        } else {
            fileUpload = '';
        }
    } else {
        console.log(' not file');
    }

    



    database.query(`SELECT * FROM notice ORDER BY id DESC LIMIT 1 `, (error, results, fields) => {
        if (error) {
            console.error('Error executing the query:', error);
            return res.status(500).send('An error occurred');
        }

        // Extract the column values from the result set
        const lastID = results.map((row) => row['id']);
        // console.log(lastID);
        var countData;
        var insertID;
        if (lastID.length === 0) {
            countData = 0;
            insertID = 1;
            // array empty 
        }
        else {
            countData = lastID.length;
            for (let i = 0; i < countData; i++) {
                insertID = lastID[i] + 1;
            }
        }
        //console.log(countData);

        //console.log(insertID);

        var query = `
        INSERT INTO notice 
        (id,title,category, dateCreate, writer, content,  fileUpload) 
        VALUES (?,?,?,?,?,?,?)
        `;

        database.query(query,[insertID,txtTitle,txtOption,dateString, txtWrite, txtContent,fileUpload], function (error, data) {

            if (error) {
                throw error;
               
            }
            else {
              
                res.render('mess', { title: 'Add notice success!', sess: req.session.sesWriter });
              
            }

        });

    });

});

router.get('/messadd', function (req, res, next) {
    // var writer = req.session.sesWriter;
    res.render('mess', { title: 'Add notice success!', sess: req.session.sesWriter });
   // res.render('notice_add', { title: 'Notice' });
});

router.get('/messupdate', function (req, res, next) {
    // var writer = req.session.sesWriter;
    res.render('mess', { title: 'Update notice success!', sess: req.session.sesWriter });
   // res.render('notice_add', { title: 'Notice' });
});


// router.get('/notice/addmess', function (req, res, next) {

//     // res.render('mess', { title: 'Add notice success!', sess: req.session.sesWriter });
// });
router.post('/proUpdateNotice', function (req, res, next) {
    const { txtid, txtsendWriter,content, searchoption, txttitle,txtfileupload } = req.body;

   //add datetime to file name
   var date_ob = new Date();
   var day = ("0" + date_ob.getDate()).slice(-2);
   var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
   var year = date_ob.getFullYear();
   var dateTime = year + month + day + '_';


   var txtTitle = txttitle;
   var txtContent = content;
   var txtWrite = req.session.sesWriter;
   if(txtWrite==''){
       txtWrite = 'undefined';
   }
   var fileUpload = txtfileupload;

   var additionName = req.session.sesWriter + '_';
   var dateString = year + '-' + month + '-' + day;

   var txtOption = '';
   if (searchoption == 'op1') {
       txtOption = "Announcement";
   } else if (searchoption == 'op2') {
       txtOption = "Suggestion";
   } else if (searchoption == 'op3') {
       txtOption = "Opinion";
   } else if (searchoption == 'op4') {
       txtOption = "Request";
   } else if (searchoption == 'op5') {
       txtOption = "Reference";
   }


   if (typeof fileUpload !== 'undefined') {
       fileUpload = fileUpload.trim();
       if (fileUpload != '') {
           fileUpload = fileUpload;
       } else {
           fileUpload = '';
       }
   } else {
       console.log(' not file');
   }


    var query = `
        UPDATE notice 
        SET title = ?,
        category = ?,
        dateCreate = ?,
        writer = ?,
        content = ?,
        fileUpload = ?

        WHERE id = "${txtid}"
          `;

    database.query(query,[txtTitle,txtOption,dateString, txtWrite, txtContent,fileUpload], function (error, data) {

        if (error) {
            throw error;
        }
        else {
            // console.log(query);
            res.render('mess', { title: 'Update notice success!', sess: req.session.sesWriter });
        }

    });





});


router.get('/notice_delete/:txtid', function (req, res, next) {
    var id = req.params.txtid;

    var query = `
            DELETE FROM notice WHERE id = "${id}"
          `;

    database.query(query, function (error, data) {
        if (error) {
            throw error;
        }
        else {
            // console.log(query);
            res.render('mess', { title: 'Delete notice success!' });
        }

    });

});


router.get('/comment/:key', function (req, res, next) {
    var id = req.params.key;
    var query = `SELECT * FROM notice WHERE id = "${id}"`;

    database.query(query, function (error, data) {
        var queryComment = `SELECT * FROM comment WHERE idNotice = "${id}" ORDER BY id DESC `;

        database.query(queryComment, function (error, data2) {
            res.render('comment', { title: 'Notice', dataPage: data, dataComment: data2, sesWriter: req.session.sesWriter, strID: id });
        });



    });

});

router.post('/addcomment', function (req, res, next) {
    //fs.readFile('user.json', (err, data) => {
    // if (err) {
    //   console.error('Error reading file:', err);
    //   res.status(500).send('Error reading data file');
    // } else {
    //     var jsonData = JSON.parse(data);
    //   var name = jsonData.name;
    var idNotice = req.body.idNotice;
    var comWriter = req.session.sesWriter;
    var txtTypeComment = req.body.txtTypeComment;


    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month + '-' + day;

    //res.send(idNotice);
    var query = `
            INSERT INTO comment 
            (idNotice ,comWriter, comDate, comContent) 
            VALUES ("${idNotice}", "${comWriter}", "${dateString}", "${txtTypeComment}")
            `;

    database.query(query, function (error, data) {

        if (error) {
            throw error;
        }
        else {
            res.redirect('/notice/comment/' + idNotice);
            // res.send("pl");
        }

    });



    //          }//end fs read json
    //   });


});
router.get('/updateComment', function (req, res, next) {

    // var sql = "SELECT idNotice FROM comment GROUP by(idNotice) ";
    const columnName = 'id';
    ///get id from main table
    database.query(`SELECT ${columnName} FROM notice`, (error, results, fields) => {
        if (error) {
            console.error('Error executing the query:', error);
            return res.status(500).send('An error occurred');
        }

        // Extract the column values from the result set
        const columnValues = results.map((row) => row[columnName]);



        for (let i = 0; i < columnValues.length; i++) {
            console.log(columnValues[i]);

            //count number of commment (foreign table)
            database.query(`SELECT COUNT(*) AS count FROM comment where idNotice = ${columnValues[i]}`, (error, results2, fields2) => {
                if (error) {
                    console.error('Error executing the query:', error);
                    return;
                }

                // Access the count value from the result
                const count = results2[0].count;
                // console.log('Record count:', count);

                //update number of comment
                database.query(`UPDATE notice SET comment = ${count} where id =${columnValues[i]}`, (error, results2, fields2) => {
                    if (error) {
                        console.error('Error executing the query:', error);
                        return;
                    }

                    console.log('Updated');

                    // Close the connection


                });

            });




        }//end for

        res.redirect('/notice');
    });


});

router.get('/testfile', function (req, res, next) {

    res.render('testeditor');

});


router.get('/:page', function (req, res, next) {
    var page = req.params.page;

    function isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    if (isNumber(page)) {

        var sql = "SELECT * FROM notice";
        database.query(sql, function (error, data) {
            if (error) {
                //throw error;
                res.render('error');
            }
            else {
                var per_page_record = 5;
                var total_records = data.length;
                var total_pages = Math.ceil(total_records / per_page_record);
                
                var start_from = (page - 1) * per_page_record;
                var sqlpage = `SELECT * FROM notice ORDER BY id DESC LIMIT ${start_from}, ${per_page_record}`;

                database.query(sqlpage, function (error, dataPage) {
                    if (error) {
                        //throw error;
                        res.render('error');
                    }
                    else {
                        res.render('notice', { title: 'Notice', dataPage: dataPage, total_pages: total_pages, page: page });
                    }
                });
            }
        });

    }
    else {
        // res.send("Not found");
        next(createError(404));
    }



});





module.exports = router;
