// dependencies
const dbData = require('./db');
const db = dbData.db;
const pgp = dbData.pgp;

// function to get the promise for all the houses data
const getHouses = () => db.any("SELECT * FROM houses");

// function to get the promise for a house's data by id
const getHouse = id => db.any(`SELECT * FROM houses WHERE id=${id}`);

// function to get the promise for students in a given house
const getHouseStudents = id => db.any(`SELECT student.id AS student_id, student.fname, student.lname FROM houses AS house JOIN students AS student ON student.house_id = house.id WHERE house.id=${id} ORDER BY student.lname, student.fname`);

// export it!
module.exports = {
  getHouses: getHouses,
  getHouse: getHouse,
  getHouseStudents: getHouseStudents
}