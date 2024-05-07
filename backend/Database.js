const mysql= require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'task_manager',
    user: 'root',
    password: 'admin@1A'
});

module.exports= connection;