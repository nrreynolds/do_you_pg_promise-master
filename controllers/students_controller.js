// dependencies 
const express = require('express'),
  mustacheExpress = require('mustache-express'),
  app = express(),
  router = express.Router(),
  students = require('../models/students_model');

// set up getting all the students
router.get('/', (req, res) => {
  // get the students promise 
  students.getStudents()
    //then
    .then(data => {
      // render the students
      res.render('students/index', {
        // send in student data
        students: data
      });
    })
    //on error
    .catch(error => {
      console.log(error);
      res.send('ERROR GETTING STUDENTS');
    });
});

// when going to a specific student's page
router.get('/:id', (req, res) => {
  // get the student promise
  students.getStudent(req.params.id)
    // then
    .then(data => {
      if (data[0]) {
        console.log("student exists");
        res.render('./students/show', data[0]);
      } else {
        res.redirect('/students');
      }
      // render the student's page, passing in the student's data

    })
    // on error
    .catch(error => {
      console.log(error);
      students.getStudents()
        .then(data => {
          res.render('students/index', {
            students: data
          });
        })

    });
});

// when editing or deleting a student
router.post('/:id', (req, res) => {

  // if deleting
  if (req.body['_method'] === 'delete') {
    // get the delete promise
    students.deleteStudent(req.params.id)

    // then
    .then(data => {
      // get all the students promise
      students.getStudents()

      //then
      .then(data => {
        // render all the students
        res.render('students/index', {
          students: data
        });
      })

      // error for getting all the students
      .catch(error => {
        console.log(error);
        res.send('ERROR GETTING STUDENTS');
      });
    })

    // error for deleting the student
    .catch(error => {
      console.log(error);
      res.send('ERROR DELETING STUDENT');
    });

    // if its updating a student
  } else if (req.body['_method'] === 'put') {

    // get the promise to edit
    students.editStudent(req.body, req.params.id)
      //then
      .then(data => {
        // get the promise to get the student data
        res.redirect(`./${data[0].id}`)
      })
      //error for editing the student
      .catch(error => {
        console.log(error);
        res.send('ERROR UPDATING STUDENT');
      })
  }
});

// to display the edit page for a student
router.get('/edit/:id', (req, res) => {
  // get promise for student data
  students.getStudent(req.params.id)
    //then
    .then(studentData => {
      // get promise for all the other houses
      students.getHousesMinusOne(studentData[0].id)
        // then
        .then(housesData => {
          // render the edit page
          res.render('students/edit', {
            student: studentData[0],
            houses: housesData
          });
        })
        // error for getting the houses
        .catch(error => {
          console.log(error);
          res.send('ERROR GETTING HOUSES');
        });
    })
    // error for getting the student
    .catch(error => {
      console.log(error);
      res.send('ERROR GETTING STUDENT DATA');
    });
})

// for adding a student
router.post('/', (req, res) => {
  // get promise to check student
  students.checkStudent(req.body)
    .then(data => {
      if (data[0]) {
        console.log('STUDENT EXISTS');
        students.getStudent(data[0].id)
          .then(data => {
            // render the student's page
            res.redirect(`students/${data[0].student_id}`);
          })
          .catch(error => {
            res.redirect('home/index');
          })
      } else {
        console.log('ADDING NEW STUDENT');
        // get promise for adding student
        students.addStudent(req.body)
          //then
          .then(data => {
            res.redirect(`students/${data[0].id}`);
          })
          // error for adding the student
          .catch(error => {
            res.send('ERROR ADDING STUDENT');
            console.log(error);
          })
      }
    })
    .catch(error => {
      console.log(error);
      res.render('home/index');
    });



});

// export router  
module.exports = router;