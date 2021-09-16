//Package requirements
const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
const cTable = require("console.table");
const db = require("./db/server");

figlet("Employee Tracker", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(chalk.cyan(data));
  init();
});

// Valdiation functions
const validateName = (answer) => {
  const pass = answer.match(/^[a-z][a-z\s]*$/);
  if (pass) {
    return true;
  }
  return chalk.redBright.bold("Enter valid name");
};

const validateNum = (answer) => {
  const pass = answer.match("^[0-9]+$");
  if (pass) {
    return true;
  }
  return chalk.redBright.bold("Must be a number");
};

// Populate user questions
function init() {
  inquirer
    .prompt({
      type: "list",
      name: "userChoices",
      message: chalk.green(`What would you like to do?`),
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add a Role",
        "View All Departments",
        "Add a Department",
        "View Employees by Manager",
        "View Employees by Department",
        "Delete Employee",
        "Delete Role",
        "Delete Department",
        "View Department Budget",
        "Update Employee Managers",
        "Quit",
      ],
    })
    .then((choice) => {
      switch (choice.userChoices) {
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add a Role":
          addRole();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "View Employees by Manager":
          viewEmpsManager();
          break;
        case "View Employees by Department":
          viewEmpsDepartment();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        case "Delete Role":
          deleteRole();
          break;
        case "Delete Department":
          deleteDepartment();
          break;
        case "View Department Budget":
          deptBudget();
        case "Update Employee Managers":
          updateEmpsManager();
        case "Quit":
          exit();
          break;
        default:
          console.log(chalk.redBright.bold("Ooops! There is an error"));
      }
    });
}

// Function to exit app
function exit() {
  db.end();
  console.log(chalk.cyanBright("Thank you for using Employee Tracker"));
}
// Adding view functions
function viewEmployees() {
  db.query(
    "SELECT employees.id AS 'ID#', CONCAT(employees.first_name, ' ', employees.last_name) AS 'Employees', title AS 'Title', salary AS 'Salary', departments.name AS 'Department', CONCAT(e.first_name, ' ', e.last_name) AS 'Manager' FROM roles LEFT JOIN employees ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id LEFT JOIN employees e ON employees.manager_id = e.id;",
    function (err, results) {
      if (err) {
        console.log(chalk.redBright.bold(err));
      }
      console.table(results);
      init();
    }
  );
}

function viewRoles() {
  db.query(
    "SELECT roles.id AS 'ID#', title AS 'Title', salary AS 'Salary', departments.name AS 'Department' FROM roles JOIN departments ON roles.department_id = departments.id",
    function (err, results) {
      if (err) {
        console.log(chalk.redBright.bold(err));
      }
      console.table(results);
      init();
    }
  );
}

function viewDepartments() {
  db.query(
    "SELECT departments.id AS 'ID#', departments.name AS 'Deparmtent' FROM departments",
    function (err, results) {
      if (err) {
        console.log(chalk.redBright.bold(err));
      }
      console.table(results);
      init();
    }
  );
}

// function viewEmpsManager() {
//     inquirer
//     .prompt({
//         type: "list",
//         name: "availManagers",
//         message: "Select a manager to view assigned employees"
//     })
//     db.query(
//       "SELECT departments.id AS 'ID#', departments.name AS 'Deparmtent' FROM departments",
//       function (err, results) {
//         if (err) {
//           console.log(chalk.redBright.bold(err));
//         }
//         console.table(results);
//         init();
//       }
//     );
//   }

// Add functions
function addEmployee() {
  db.query(
  "SELECT * FROM roles;",
  function (err, rolesResults) {
    if (err) throw err;
        roles = [];
        for (let i = 0; i < rolesResults.length; i++){
            roles.push(rolesResults[i].id + ' ' + rolesResults[i].title);
        }
    });
      console.log(chalk.redBright.bold(err));
    console.table(rolesResults);
}

//     inquirer.prompt([
//       {
//         type: "input",
//         name: "firstName",
//         message: chalk.green("Enter first name of employee"),
//         validate: validateName,
//       },
//       {
//         type: "input",
//         name: "lastName",
//         message: chalk.green("Enter last name of employee"),
//         validate: validateName,
//       },
//       {
//         type: "list",
//         message: chalk.green("Enter the role for the employee"),
//         choices: rolesResults,
//       },
//     ])
// }
