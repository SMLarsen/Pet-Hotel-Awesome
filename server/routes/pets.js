var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';


router.post('/', function(req, res) {
  newPet= req.body;
  console.log("THIS IS THE: ", newPet);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'INSERT INTO pets (name, breed, color, owners_id) ' +
      'VALUES ($1, $2, $3, $4)',
      [newPet.petName, newPet.petBreed, newPet.petColor, newPet.owners_id],
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

router.get('/', function(req, res) {
  console.log('get request');
  // get pets from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT pets.id, name, breed, color, owners.first_name, owners.last_name FROM pets JOIN owners ON pets.owners_id=owners.id;', function(err, result) {
      done(); // close the connection.
      // console.log('the client!:', client);

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      console.log("success");
      console.log(result.rows);
      res.send(result.rows);

    });

  });
});


module.exports = router;
