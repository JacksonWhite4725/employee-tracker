const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'company_db'
    },
    console.log(`Connected to the company database.`)
);

const question = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'questionSelection',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
      }
    ])
    .then((answers) => {
      switch (answers.questionSelection) {
        case 'View All Employees':
          // RUN VIEW EMPLOYEE QUERY HERE
          break;
        case 'Add Employee':
          // RUN ADD EMPLOYEE QUERY HERE
          break;
        case 'Update Employee Role':
          // RUN UPDATE EMPLOYEE QUERY HERE
          break;
        case 'View All Roles':
          // RUN VIEW ROLES QUERY HERE
          break;
        case 'Add Role':
          // RUN ADD ROLE QUERY HERE
          break;
        case 'View All Departments':
          // RUN VIEW DEPARTMENTS QUERY HERE
          break;
        case 'Add Department':
          // RUN ADD DEPARTMENTS QUERY HERE
          break;
        case 'Quit':
          // RUN QUIT HERE
          break;
        default:
          break;
      }
    });
};

/*
**PSUDEOCODE**
Use inquerirer to display different selections using list type questions
Depending on answers, use the db.query function to select, insert, update, or delete values
Use the console table package to display results in CLI
*/
question();