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
  console.log(titles);
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
          viewAllEmployees();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View All Roles':
          ViewAllRoles();
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

const viewAllEmployees = () => {
  db.query('SELECT * FROM employee', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    question();
  });
}

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'What is the employee\'s first name?',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'What is the employee\'s last name?',
      },
      {
        type: 'list',
        name: 'role',
        message: 'What is the employee\'s role?',
        choices: ['test'], // Need to add way to query results from roles table so user doesn't input a missing role
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Who is the employee\'s manager?',
        choices: ['test'], // Need to add way to query names of employees from employee table
      },
    ])
    .then((answers) => {
      db.query('INSERT INTO employee SET ?', [answers], (err, result) => {
        if (err) {
          console.log(err);
        }
        console.table(result);
        question();
      });
    });
};

const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee\'s role do you want to update?',
        choices: ['test'],
      },
      {
        type: 'list',
        name: 'role',
        message: 'Which role do you want to assign the selected employee?',
        choices: ['test'],
      },
    ])
    .then((answers) => {
      db.query('UPDATE employee SET roles_id = ? WHERE id = ?', [answers.role, answers.employee], (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log('Updated employee\'s role!');
        question();
      });
    });
};

const ViewAllRoles = () => {
  db.query('SELECT * FROM roles', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    question();
  });
}

question();