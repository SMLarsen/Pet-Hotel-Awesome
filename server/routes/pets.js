var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';


router.post('/', function(req, res) {
  newPet= req.body;
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'INSERT INTO pets (id, name, breed, color, owners_id) ' +
      'VALUES ($1, $2, $3, $4, $5, $6)',
      [newPet.id, newPet.name, newPet.breed, newPet.color, newPet.owners_id],
      function(err, result) {
        done();

        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });

  });

});

module.exports = router;