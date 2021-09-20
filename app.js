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
  const pass = answer.match(/^[a-zA-Z][a-zA-Z\s]*$/);
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
        "View Department Budget",
        "View Employees by Department",
        /*        "Delete Employee",
        "Delete Role",
        "Delete Department",
        "Update Employee Managers",*/
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
        case "View Department Budget":
          viewDeptBudget();
          break;
        case "View Employees by Department":
          viewEmpsDepartment();
          break;
        /*        case "Delete Employee":
          deleteEmployee();
          break;
        case "Delete Role":
          deleteRole();
          break;
        case "Delete Department":
          deleteDepartment();
          break;
        case "Update Employee Managers":
          updateEmpsManager();
          break;*/
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

// Creating array for role query in Add Employee Prompt
var roleArr = [];
function chooseRole() {
  db.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });
  return roleArr;
}

// Create array for manager query in Add Employee Promtpt
var managerArr = [];
function chooseManager() {
  db.query(
    "SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS 'Manager' FROM employees WHERE manager_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        managerArr.push(res[i].Manager);
      }
    }
  );
  return managerArr;
}

// Create array for department query in Add Role Prompt
var departmentArr = [];
function chooseDepartment() {
  db.query("SELECT name FROM departments", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      departmentArr.push(res[i].name);
    }
  });
  return departmentArr;
}

// Add functions to inquiry
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: chalk.green("Enter first name of employee"),
        validate: validateName,
      },
      {
        type: "input",
        name: "lastName",
        message: chalk.green("Enter last name of employee"),
        validate: validateName,
      },
      {
        type: "list",
        name: "role",
        message: chalk.green("Select the role for the employee"),
        choices: chooseRole(),
      },
      {
        type: "list",
        name: "choice",
        message: chalk.green("Select manager for employee"),
        choices: chooseManager(),
      },
    ])
    .then(function (val) {
      var roleId = chooseRole().indexOf(val.role) + 1;
      var managerId = chooseManager().indexOf(val.choice) + 1;
      db.query(
        "INSERT INTO employees SET ?",
        {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId,
        },
        function (err) {
          if (err) throw err;
          console.log(
            chalk.yellowBright.bold("Employee was added to database")
          );
          console.table(val);
          init();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: chalk.green("Enter name for new role"),
        validate: validateName,
      },
      {
        type: "input",
        name: "salary",
        message: chalk.green("Enter the salary for new role"),
        validate: validateNum,
      },
      {
        type: "list",
        name: "department",
        message: chalk.green("Enter department this role serves"),
        choices: chooseDepartment(),
      },
    ])
    .then(function (val) {
      var deptId = chooseDepartment().indexOf(val.department) + 1;
      db.query(
        "INSERT INTO roles SET ?",
        {
          title: val.title,
          salary: val.salary,
          department_id: deptId,
        },
        function (err) {
          if (err) throw err;
          console.log(
            chalk.yellowBright.bold("New Role was added to database")
          );
          console.table(val);
          init();
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: chalk.green("Department Name to Add to Roster Database"),
        validate: validateName,
      },
    ])
    .then(function (res) {
      db.query(
        "INSERT INTO departments SET ?",
        {
          name: res.name,
        },
        function (err) {
          if (err) throw err;
          console.log(
            chalk.yellowBright.bold("New Department was added to database")
          );
          console.table(res);
          init();
        }
      );
    });
} // Everything is working-ish though here

// Function to Update Roll using query in the function
function updateRole() {
  db.query(
    "SELECT CONCAT(employees.id, ':', employees.first_name, ' ', employees.last_name) AS Employee FROM employees JOIN roles ON employees.role_id = roles.id;",
    function (err, res) {
      if (err) throw err;
      //console.log(res);
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: chalk.green("Select the employee to update role"),
            choices: function () {
              var employee = [];
              for (var i = 0; i < res.length; i++) {
                employee.push(res[i].Employee);
              }
              return employee;
            },
          },
          {
            type: "list",
            name: "role",
            message: chalk.green("Select the new role for employee"),
            choices: chooseRole(),
          },
        ])
        .then(function (updateRes) {
          console.log(updateRes);
          var roleId = chooseRole().indexOf(updateRes.role) + 1;
          console.log(roleId);
          var employeeId = updateRes.employee.split(":")[0];
          db.query(
            "UPDATE employees SET role_id = ? WHERE id = ?",
            [roleId, employeeId],
            function (err) {
              if (err) throw err;
              console.table(res);
              init();
            }
          );
        });
    }
  );
}

// Additional functions to view Employees
function viewEmpsDepartment() {
  db.query(
    "SELECT departments.name AS Deparmtent, CONCAT(employees.first_name, ' ', employees.last_name) AS Employee FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON departments.id = roles.department_id",
    function (err, results) {
      if (err) {
        console.log(chalk.redBright.bold(err));
      }
      console.table(results);
      init();
    }
  );
}

// This works but maybe not the intended way
function viewEmpsManager() {
  db.query(
    "SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS Employees, CONCAT(e.first_name, ' ', e.last_name) AS 'Manager' FROM roles LEFT JOIN employees ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id LEFT JOIN employees e ON employees.manager_id = e.id WHERE employees.manager_id IS NOT NULL",
    function (err, results) {
      if (err) {
        console.log(chalk.redBright.bold(err));
      }
      console.table(results);
      init();
    }
  );
}

// Function to view each department budget
function viewDeptBudget (){
  db.query(
    "SELECT departments.id, departments.name AS Department, SUM(roles.salary) AS Budget FROM departments LEFT JOIN roles ON roles.department_id = departments.id LEFT JOIN employees ON employees.role_id = roles.id GROUP BY departments.id",
    function (err, results) {
      if (err) {
        console.log(chalk.redBright.bold(err));
      }
      console.table(results);
      init();
    }
  );
}