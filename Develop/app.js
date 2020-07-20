//connect to other files in directory
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//dependencies
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const asyncWriteFile = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//holds employess user creates profiles for
const employees = [];

//ask user for role
function roleQ() {
  return inquirer.prompt({
    type: "checkbox",
    name: "role",
    message:
      "Which of the following roles does the employee have?",
    choices: ["Engineer", "Manager", "Intern"],
  });
}
//asks user about engineer
function engineerQ() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the full name of this engineer?",
    },
    {
      type: "input",
      name: "id",
      message: "What is the engineer's ID number?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the engineer's email address?",
    },
    {
      type: "input",
      name: "github",
      message:
        "Please enter the engineer's GitHub profile URL",
    },
  ]);
}
//asks user about manager
function managerQ() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the full name of this manager?",
    },
    {
      type: "input",
      name: "id",
      message: "What is the manager's ID number?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the manager's email address?",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is the manager's office number?",
    },
  ]);
}
//asks user about intern
function internQ() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the full name of this intern?",
    },
    {
      type: "input",
      name: "id",
      message: "What is the intern's ID number?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the intern's email address?",
    },
    {
      type: "input",
      name: "school",
      message: "What school is the intern affiliated with?",
    },
  ]);
}
//asks user if they want to input another employee
function moreEmployees() {
  return inquirer.prompt({
    type: "confirm",
    name: "moreEmployees",
    message: "Would you like to add another employee?",
    default: true,
  });
}
//Runs through user input to build team
function runTeamBuilder() {
  roleQ()
    .then(function (data) {
      if (data.role[0] === "Engineer") {
        engineerQ().then(function (ans) {
          const engineerObj = new Engineer(
            ans.name,
            ans.id,
            ans.email,
            ans.github
          );
          employees.push(engineerObj);
          writeTeamBuilder();
          moreEmployees().then(function (ans) {
            if (ans.moreEmployees === true) {
              runTeamBuilder();
            }
          });
        });
      } else if (data.role[0] === "Manager") {
        managerQ().then(function (ans) {
          const managerObj = new Manager(
            ans.name,
            ans.id,
            ans.email,
            ans.github
          );
          employees.push(managerObj);
          writeTeamBuilder();
          moreEmployees().then(function (ans) {
            if (ans.moreEmployees === true) {
              runTeamBuilder();
            }
          });
        });
      } else if (data.role[0] === "Intern") {
        internQ().then(function (ans) {
          const internObj = new Intern(
            ans.name,
            ans.id,
            ans.email,
            ans.github
          );
          employees.push(internObj);
          writeTeamBuilder();
          moreEmployees().then(function (ans) {
            if (ans.moreEmployees === true) {
              runTeamBuilder();
            }
          });
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

//writes file using render functions
function writeTeamBuilder() {
  const html = render(employees);
  asyncWriteFile(outputPath, html);
}
runTeamBuilder();
