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
        name: 'firstName',
        message: 'What is the employee\'s first name?',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'What is the employee\'s last name?',
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'What is the employee\'s role? Please input the role ID.',
      },
      {
        type: 'input',
        name: 'managerId',
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
        name: 'employeeId',
        message: 'Which employee\'s role do you want to update? Please type in the ID.',
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Which role id do you want to assign the selected employee?',
      },
    ])
    .then((answers) => {
      db.query('UPDATE employee SET roles_id = ? WHERE id = ?', [answers.roleId, answers.employeeId], (err, results) => {
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
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'role',
        message: 'What is the name of the role?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
      },
      {
        type: 'input',
        name: 'deparmentId',
        message: 'Which department id does this role belong to?',
      },
    ])
    .then((answers) => {
      db.query('INSERT INTO role SET ?', [answers], (err, result) => {
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
        name: 'name',
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