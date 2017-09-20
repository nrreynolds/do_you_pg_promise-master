// dependancies
const express = require('express'),
  mustacheExpress = require('mustache-express'),
  router = express.Router(),
  houses = require('../models/houses_model');

// to get page with all the houses
router.get('/', (req, res) => {
  // get all the houses promise
  houses.getHouses()
    // then
    .then(data => {
      //render them
      res.render('houses/index', {
        houses: data
      });
    })
    // catch error for getting houses
    .catch(error => {
      console.log(error);
      res.send('ERROR GETTING HOUSES');
    });
});

// to get a specific house
router.get('/:id', (req, res) => {
  // get the house promise
  houses.getHouse(req.params.id)
    // then
    .then(houseData => {
      // get the students
      houses.getHouseStudents(req.params.id)
        //then
        .then(houseStudents => {
          // render the house page
          res.render('houses/show', {
            house: houseData[0],
            students: houseStudents
          });
        })
        // catch error for getting the students
        .catch(error => {
          console.log(error);
          res.send('ERROR GETTING HOUSE STUDENTS');
        });
      // catch error for getting the house data
    })
    .catch(error => {
      console.log(error);
      res.send('ERROR GETTING HOUSE');
    })
})

// export router
module.exports = router;