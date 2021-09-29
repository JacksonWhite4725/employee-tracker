const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./config/connection');
require('dotenv').config();
require('console.table');

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
          addRole();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Quit':
          quit();
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
        name: 'first_name',
        message: 'What is the employee\'s first name?',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the employee\'s last name?',
      },
      {
        type: 'input',
        name: 'roles_id',
        message: 'What is the employee\'s role? Please input the role ID.',
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'Who is the employee\'s manager? Please type in the ID.',
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
        type: 'input',
        name: 'id',
        message: 'Which employee\'s role do you want to update? Please type in the ID.',
      },
      {
        type: 'input',
        name: 'roles_id',
        message: 'Which role id do you want to assign the selected employee?',
      },
    ])
    .then((answers) => {
      db.query('UPDATE employee SET roles_id = ? WHERE id = ?', [answers.roleId, answers.employeeId], (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log('Updated employee\'s role!');
        console.table(result);
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
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the name of the role?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Which department id does this role belong to?',
      },
    ])
    .then((answers) => {
      db.query('INSERT INTO roles SET ?', [answers], (err, result) => {
        if (err) {
          console.log(err);
        }
        console.table(result);
        question();
      });
    });
};

const viewAllDepartments = () => {
  db.query('SELECT * FROM department', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
    question();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'dep_name',
        message: 'What is the name of the department?',
      },
    ])
    .then((answers) => {
      db.query('INSERT INTO department SET ?', [answers], (err, result) => {
        if (err) {
          console.log(err);
        }
        console.table(result);
        question();
      });
    });
};

const quit = () => {
  process.exit();
};

question();