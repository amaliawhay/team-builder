const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const asyncWriteFile = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
//Questions to be asked of all employee types

// function runTeamBuilder() {
//   function roleQ() {
//     inquirer
//       .prompt({
//         type: "checkbox",
//         name: "role",
//         message:
//           "Which of the following roles does the employee have?",
//         choices: ["Engineer", "Manager", "Intern"],
//       })
//       .then((ans) => {
//         if (ans.role[0] === "Engineer") {
//           engineerQ();
//         } else if (ans.role[0] === "Manager") {
//           managerQ();
//         } else {
//           internQ();
//         }
//       });
//   }
//   function engineerQ() {
//     inquirer
//       .prompt([
//         {
//           type: "input",
//           name: "name",
//           message:
//             "What is the full name of this engineer?",
//         },
//         {
//           type: "input",
//           name: "id",
//           message: "What is the engineer's ID number?",
//         },
//         {
//           type: "input",
//           name: "email",
//           message: "What is the engineer's email address?",
//         },
//         {
//           type: "input",
//           name: "github",
//           message:
//             "Please enter the engineer's GitHub profile URL",
//         },
//       ])
//       .then((ans) => {
//         const engineerObj = new Engineer(
//           ans.id,
//           ans.email,
//           ans.name,
//           ans.github
//         );
//         employees.push(engineerObj);
//         moreEmployees();
//       });
//   }
//   function managerQ() {
//     inquirer
//       .prompt([
//         {
//           type: "input",
//           name: "name",
//           message: "What is the full name of this manager?",
//         },
//         {
//           type: "input",
//           name: "id",
//           message: "What is the manager's ID number?",
//         },
//         {
//           type: "input",
//           name: "email",
//           message: "What is the manager's email address?",
//         },
//         {
//           type: "input",
//           name: "officeNumber",
//           message: "What is the manager's office number?",
//         },
//       ])
//       .then((ans) => {
//         const managerObj = new Manager(
//           ans.id,
//           ans.email,
//           ans.name,
//           ans.officeNumber
//         );
//         employees.push(managerObj);
//         moreEmployees();
//       });
//   }
//   function internQ() {
//     inquirer
//       .prompt([
//         {
//           type: "input",
//           name: "name",
//           message: "What is the full name of this intern?",
//         },
//         {
//           type: "input",
//           name: "id",
//           message: "What is the intern's ID number?",
//         },
//         {
//           type: "input",
//           name: "email",
//           message: "What is the intern's email address?",
//         },
//         {
//           type: "input",
//           name: "school",
//           message:
//             "What school is the intern affiliated with?",
//         },
//       ])
//       .then((ans) => {
//         const internObj = new Intern(
//           ans.id,
//           ans.email,
//           ans.name,
//           ans.school
//         );
//         employees.push(internObj);
//         moreEmployees();
//       });
//   }
//   function moreEmployees() {
//     inquirer
//       .prompt({
//         type: "confirm",
//         name: "moreEmployees",
//         message: "Would you like to add another employee?",
//         default: true,
//       })
//       .then((ans) => {
//         if (ans.moreEmployees === true) {
//           roleQ();
//         } else {
//           writeTeamBuilder();
//         }
//       });
//   }

// }
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

function writeTeamBuilder() {
  const html = render(employees);
  asyncWriteFile(outputPath, html);
}
runTeamBuilder();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
