var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/Sigma';

// router.get('/', function(req, res) {
//   console.log('get owners request');
//
//   pg.connect(connectionString, function(err, client, done) {
//     if (err) {
//       console.log('Could not connect to database');
//       res.sendStatus(500);
//     }
//
//     client.query('SELECT * FROM owners', function(err, result) {
//       done();
//
//       if(err) {
//         console.log('select query error: ', err);
//         res.sendStatus(500);
//       }
//       res.send(result.rows);
//
//     });
//
//   });
//
// });

router.post('/', function(req, res) {
  newOwner = req.body;
  console.log("this is the new: ", newOwner);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('Could not connect to database');
      res.sendStatus(500);
    }

    client.query(
      'INSERT INTO owners (first_name, last_name) ' +
      'VALUES ($1, $2)',
      [newOwner.firstName, newOwner.lastName],
      function(err, result) {
        done();

        if (err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else{
          res.sendStatus(201);
        }
    });
  });
});

module.exports = router;
