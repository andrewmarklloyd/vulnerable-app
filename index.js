require('dotenv').config()

const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database : process.env.DATABASE
}

var mysql = require('mysql');
var connection = mysql.createConnection(config)

connection.connect(function(err) {
  if (err) throw err;
  console.log("##Successfully connected to MySQL container##");
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/query', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/query.html'))
});

app.get('/query-escaped', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/query-escaped.html'))
});

app.post('/query', (req, res) => {
  connection.query('SELECT * FROM students WHERE student_id = ' + req.body.student_id, function (error, results, fields) {
    if (error) {
      res.send({results: null, error})
    } else {
      res.send({results, error: null})
    }
  });
});

app.post('/query-escaped', (req, res) => {
  connection.query('SELECT * FROM students WHERE student_id = ?', [req.body.student_id], function (error, results, fields) {
    if (error) {
      res.send({results: null, error})
    } else {
      res.send({results, error: null})
    }
  });
});

app.listen(process.env.PORT, () => {

  console.info('server started on port', process.env.PORT);
});
