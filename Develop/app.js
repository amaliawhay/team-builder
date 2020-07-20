const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const asyncWriteFile = util.promisify(fs.writeFile);

const employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
//Questions to be asked of all employee types
function runTeamBuilder() {
  console.log(
    "Build profiles for your team members! Answer the following questions about each of your team members"
  );
  function roleQ() {
    inquirer
      .prompt([
        {
          type: "checkbox",
          name: "role",
          message:
            "Which of the following roles does the employee have?",
          choices: ["Engineer", "Manager", "Intern"],
        },
      ])
      .then((ans) => {
        if (ans.role[0] === "Engineer") {
          engineerQ();
        } else if (ans.role[0] === "Manager") {
          managerQ();
        } else {
          internQ();
        }
      });
  }
  function engineerQ() {
    inquirer.prompt([
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
  function managerQ() {
    inquirer.prompt([
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
  function internQ() {
    inquirer.prompt([
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
        message:
          "What school is the intern affiliated with?",
      },
    ]);
  }
  function moreEmployees() {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "moreEmployees",
          message:
            "Would you like to add another employee?",
        },
      ])
      .then((ans) => {
        if (ans.moreEmployees === true) {
          roleQ();
        } else {
          console.log(
            "You've built profiles for each of your team members now!"
          );
        }
      });
  }
}
// function employeeQ() {
//   return inquirer.prompt([
//     {
//       type: "input",
//       name: "name",
//       message: "What is the full name of this employee?",
//     },
//     {
//       type: "input",
//       name: "id",
//       message: "What is the employee's ID number?",
//     },
//     {
//       type: "input",
//       name: "email",
//       message: "What is the employee's email address?",
//     },
//     {
//       type: "checkbox",
//       name: "role",
//       message:
//         "Which of the following roles does the employee have?",
//       choices: ["Engineer", "Manager", "Intern"],
//     },
//   ]);
// }

// //Question for Engineer
// function engineerQ() {
//   return inquirer.prompt([
//     {
//       type: "input",
//       name: "github",
//       message:
//         "Please enter the engineer's GitHub profile URL",
//     },
//   ]);
// }

// //Question for the manager
// function managerQ() {
//   return inquirer.prompt([
//     {
//       type: "input",
//       name: "officeNumber",
//       message: "What is the manager's office number?",
//     },
//   ]);
// }

// //Question for Intern
// function internQ() {
//   return inquirer.prompt([
//     {
//       type: "input",
//       name: "school",
//       message: "What school is the intern attending?",
//     },
//   ]);
// }

// //Inquirer asks questions
// async function startQ() {
//   try {
//   }
// }

// employeeQ()
//   .then(function (ans) {
//     if (ans.role[0] === "Engineer") {
//       engineerQ().then(function (answer) {
//         const engineerObj = new Engineer(
//           ans.id,
//           ans.email,
//           ans.name,
//           answer.github
//         );
//         employees.push(engineerObj);
//       });
//     } else if (ans.role[0] === "Mangager") {
//       managerQ().then(function (res) {
//         const managerObj = new Manager(
//           ans.id,
//           ans.email,
//           ans.name,
//           res.officeNumber
//         );
//         employees.push(managerObj);
//       });
//     } else {
//       internQ().then(function (response) {
//         const internObj = new Intern(
//           ans.id,
//           ans.email,
//           ans.name,
//           response.school
//         );
//         employees.push(internObj);
//       });
//     }
//   })
//   .then(function () {
//     console.log(employees);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

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
