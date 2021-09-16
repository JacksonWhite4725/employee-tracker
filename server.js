const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'company_db'
    },
    console.log(`Connected to the company database.`)
);

/*
**PSUDEOCODE**
Use inquerirer to display different selections using list type questions
Depending on answers, use the db.query function to select, insert, update, or delete values
Use the console table package to display results in CLI
*/