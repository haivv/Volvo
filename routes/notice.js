var express = require('express');
var router = express.Router();
const IP = require('ip'); //get client ip
var database = require('../database');
const fs = require('fs');

/* GET home page. */


router.get('/', function (req, res, next) {
   var ses =  req.session.sesWriter;
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
            var total_pages = Math.round(total_records / per_page_record);
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
    // var writer = req.session.sesWriter;
    // res.send(writer);
   res.render('notice_add', { title: 'Notice'});  
});

router.post('/proAddNotice', function (req, res, next) {

    const txtSelect = req.body.searchoption;
    var txtOption ='';
    if(txtSelect =='op1'){
        txtOption = "Announcement";
    } else if(txtSelect =='op2'){
        txtOption = "Suggestion";
    }else if(txtSelect =='op3'){
        txtOption = "Opinion";
    }else if(txtSelect =='op4'){
        txtOption = "Request";
    }else if(txtSelect =='op5'){
        txtOption = "Reference";
    }
    
    
    // fs.readFile('user.json', (err, data) => {
    //     if (err) {
    //       console.error('Error reading file:', err);
    //       res.status(500).send('Error reading data file');
    //     } else {
        //   var jsonData = JSON.parse(data);
        //   var name = jsonData.name;
          const txtTitle = req.body.txtTitle;
          const txtContent = req.body.txtContent;
          const txtWrite = req.session.sesWriter;
          
          var today = new Date();
      
          var year = today.getFullYear();
          var month = ('0' + (today.getMonth() + 1)).slice(-2);
          var day = ('0' + today.getDate()).slice(-2);
      
          var dateString = year + '-' + month  + '-' + day;
      
          var query = `
          INSERT INTO notice 
          (title,category, dateCreate, writer, content) 
          VALUES ("${txtTitle}", "${txtOption}", "${dateString}", "${txtWrite}", "${txtContent}")
          `;
      
          database.query(query, function(error, data){
      
              if(error)
              {
                  throw error;
              }	
              else
              {
                  res.render('mess', { title: 'Add notice success!', sess:req.session.sesWriter});
              }
      
          });
       
       
       
    //     }//end fs read json
    //   });
    
});


router.get('/comment/:key', function (req, res, next) {
    var id = req.params.key;
    var query = `SELECT * FROM notice WHERE id = "${id}"`;

	database.query(query, function(error, data){
        var queryComment = `SELECT * FROM comment WHERE idNotice = "${id}" ORDER BY id DESC `;
        
        database.query(queryComment, function(error,data2){
            res.render('comment', {title: 'Notice', dataPage:data, dataComment:data2});
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

            var dateString = year + '-' + month  + '-' + day;

            //res.send(idNotice);
            var query = `
            INSERT INTO comment 
            (idNotice ,comWriter, comDate, comContent) 
            VALUES ("${idNotice}", "${comWriter}", "${dateString}", "${txtTypeComment}")
            `;

            database.query(query, function(error, data){

                if(error)
                {
                    throw error;
                }	
                else
                {
                    res.redirect('/notice/comment/'+idNotice);
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
    const  columnValues = results.map((row) => row[columnName]);
   
    
   
    for (let i = 0; i< columnValues.length; i++)
    {
        console.log(columnValues[i]);

        //count number of commment (foreign table)
        database.query(`SELECT COUNT(*) AS count FROM comment where idNotice = ${columnValues[i]}`, (error, results2, fields2) => {
            if (error) {
              console.error('Error executing the query:', error);
              return;
            }
          
            // Access the count value from the result
            const count = results2[0].count;
            console.log('Record count:', count);

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
router.get('/:page', function (req, res, next) {
    var page = req.params.page;
    var sql = "SELECT * FROM notice";
    database.query(sql, function (error, data) {
        if (error) {
            throw error;
        }
        else {
            var per_page_record = 5;
            var total_records = data.length;
            var total_pages = Math.round(total_records / per_page_record);
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




module.exports = router;
