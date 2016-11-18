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
      'VALUES ($1, $2, $3, $4) RETURNING id AS pet_id',
      [newPet.petName, newPet.petBreed, newPet.petColor, newPet.petOwner],
      function(err, result) {
        done();

        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          var petId = result.rows[0].pet_id;
          console.log("This is the petid:", petId);
          res.sendStatus(201);

          // newVisit= req.body;

          client.query(
            //picks the visits table, and specifies what fields to populate
            'INSERT INTO visits (check_in_date, pets_id) ' +
            //tells visits what the values are GOINg to be..
            'VALUES (NOW(), $1)',
             [petId],
            function(err, result) {
              console.log("New: " ,result);
              done();
              if(err) {
                console.log("error");
              } else {
                console.log("working visits");
              }
            });
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
