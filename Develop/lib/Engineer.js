// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

//extends grabs the info for Employee
class Engineer extends Employee {
  constructor(name, id, email, github) {
    //super gives access to this.name etc from employee
    super(name, id, email);
    this.github = github;
  }
  getGithub() {
    return this.github;
  }
  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;
