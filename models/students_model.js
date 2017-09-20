// dependencies
const dbData = require('./db');
const db = dbData.db;
const pgp = dbData.pgp;
const randomInt = require('random-int');

// function to get all the students, joining the house as well, return the promise
const getStudents = () => db.any("SELECT student.id AS student_id, house.name, student.house_id, student.fname, student.lname FROM students AS student JOIN houses AS house ON student.house_id = house.id ORDER BY house.id, student.lname, student.fname");

// function to get promise for selecting a student by the student's id
const getStudent = (id) => db.any(`SELECT student.id AS student_id, student.fname, student.lname, student.image, house.name, house.id FROM students AS student JOIN houses AS house ON student.house_id = house.id WHERE student.id = ${id}`);

const checkStudent = data => {
  const checkData = {
    fname: data['fname'],
    lname: data['lname'],
    image: data['image'],
  };

  const query = pgp.as.format('SElECT id FROM students WHERE fname = $[fname] AND lname = $[lname] AND image = $[image]', checkData);
  return db.any(query);
}

// function to add a student to the table
const addStudent = (data) => {

  // parse the post data (for some reason I had to do it manually) also get random house
  const insertData = {
    fname: data['fname'],
    lname: data['lname'],
    image: data['image'],
    house_id: randomInt(1, 4)
  };

  // set up query
  const query = pgp.as.format("INSERT INTO students (fname, lname, image, house_id) VALUES ($[fname], $[lname], $[image], $[house_id]) RETURNING id", insertData);

  // return the promise
  return db.any(query);

}

// function to get the promise to delete a student by the student's id
const deleteStudent = (id) => db.any(`DELETE FROM students WHERE id=${id}`);

// function to get the promise for all the houses' data except for the house id given -- for the edit page, the one that is already assigned should be selected
const getHousesMinusOne = (id) => db.any(`SELECT house.id, house.name FROM houses AS house WHERE house.id != ${id}`);

// function to get promise to update student's data
const editStudent = (data, id) => {

  // parse data (again had to do it manually)
  const editData = {
    fname: data['fname'],
    lname: data['lname'],
    image: data['image'],
    house_id: data['house_id'],
    id: id
  };


  // set up query
  const query = pgp.as.format("UPDATE students SET fname = $[fname], lname = $[lname], image = $[image], house_id = $[house_id] WHERE id = $[id] RETURNING id", editData);

  // return promise
  return db.any(query);
}

// export everything
module.exports = {
  getStudents: getStudents,
  getStudent: getStudent,
  addStudent: addStudent,
  deleteStudent: deleteStudent,
  getHousesMinusOne: getHousesMinusOne,
  editStudent: editStudent,
  checkStudent: checkStudent
}