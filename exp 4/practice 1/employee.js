const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let employees = []; // store employee data

function showMenu() {
  console.log(`
Employee Management System
1. Add Employee
2. List Employees
3. Remove Employee
4. Exit
  `);

  rl.question('Enter your choice: ', (choice) => {
    switch (choice.trim()) {
      case '1':
        addEmployee();
        break;
      case '2':
        listEmployees();
        break;
      case '3':
        removeEmployee();
        break;
      case '4':
        console.log('Exiting program...');
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        showMenu();
    }
  });
}

function addEmployee() {
  rl.question('Enter employee name: ', (name) => {
    rl.question('Enter employee ID: ', (id) => {
      employees.push({ name, id });
      console.log(`Employee ${name} (ID: ${id}) added successfully.`);
      showMenu();
    });
  });
}

function listEmployees() {
  if (employees.length === 0) {
    console.log('No employees found.');
  } else {
    console.log('\nEmployee List:');
    employees.forEach((emp, index) => {
      console.log(`${index + 1}. Name: ${emp.name}, ID: ${emp.id}`);
    });
  }
  showMenu();
}

function removeEmployee() {
  rl.question('Enter employee ID to remove: ', (id) => {
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      const removed = employees.splice(index, 1)[0];
      console.log(`Employee ${removed.name} (ID: ${removed.id}) removed successfully.`);
    } else {
      console.log(`No employee found with ID: ${id}`);
    }
    showMenu();
  });
}

// Start app
showMenu();
