
const express = require('express');
const mysql = require('mysql');
const connection = require('./Database')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
const port = 4000;
var cors = require('cors')
app.use(express.json());


app.use(cors());

app.get('/fetch', (req, res) => {
  let sql = "SELECT * FROM (SELECT *, ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) as row_num FROM task_manager.tasks) as subquery ORDER BY row_num DESC";
  connection.query(sql,function(err,results){
    if(err) throw err;
    res.send(results);
  })
});

app.get('/pending', (req, res) => {
  let sql = "select * from tasks where COMPLETED=0";
  connection.query(sql,function(err,results){
    if(err) throw err;
    res.send(results);
  })
});

app.get('/com', (req, res) => {
  let sql = "select * from tasks where COMPLETED=1";
  connection.query(sql,function(err,results){
    if(err) throw err;
    res.send(results);
  })
});

app.delete('/delete/:id',(req,res)=>{
  const { id } = req.params; // Get the ID from the request URL
  const sql = 'delete from tasks where ID=?';
  const values = [id];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating data in SQL table:', err);
      res.status(500).json({ error: 'Failed to update data' });
      return;
    }
    console.log('Data updated in SQL table:', result);
    res.status(200).json({ message: 'Data updated successfully' });
  });
 
});

app.post('/fetch/insert', (req, res) => {

  
  const { title, description, date } = req.body;
  console.log("Received Data:", req.body); // Log the received data
  
  const query = `INSERT INTO tasks(TITLE, DESCR, DATE, COMPLETED) VALUES (?, ?, ?, ?);`;
  
  connection.query(query, [title, description, date, 0], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    } else {
      console.log("Inserted successfully:", result);
      res.send("SUCCESS");
    }
  });
});




app.put('/updateData/:id', (req, res) => {
  const { id } = req.params; // Get the ID from the request URL
  const { value } = req.body; // Assuming name and age are the fields to update

  // Your SQL query to update data
  const sql = 'update tasks set COMPLETED=? where ID=?';
  const values = [value,id]; // Values to update

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating data in SQL table:', err);
      res.status(500).json({ error: 'Failed to update data' });
      return;
    }
    console.log('Data updated in SQL table:', result);
    res.status(200).json({ message: 'Data updated successfully' });
  });
});


app.delete('/deleteData/:id', (req, res) => {
  const { id } = req.params; // Get the ID from the request URL

  // Your SQL query to delete data
  const sql = 'delete from tasks where ID=?';

  connection.query(sql, id, (err, result) => {
    if (err) {
      console.error('Error deleting data from SQL table:', err);
      res.status(500).json({ error: 'Failed to delete data' });
      return;
    }
    console.log('Data deleted from SQL table:', result);
    res.status(200).json({ message: 'Data deleted successfully' });
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connection.connect(function(err){
    if(err) throw err;
    console.log("DATABASE CONNECTED");
  })
});
