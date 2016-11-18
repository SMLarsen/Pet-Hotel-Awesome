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
      [newPet.petName, newPet.petBreed, newPet.petColor, newPet.owners_id],
      function(err, result) {
        console.log("result" ,result);
        done();

        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          var petId = result.rows[0].pet_id;
          console.log("This is the petid:", petId);
          res.sendStatus(201);
          
        }
      });
  });
});

module.exports = router;