//Package requirements
const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const cTable = require('console.table');
const db = require('./db/server');

figlet ('Employee Tracker', function(err, data){
    if (err){
        console.log('Something went wrong...');
        console.dir(err);
        return;
    } 
    console.log(chalk.cyan(data))
});

// Valdiation functions
const validateName = answer => {
    const pass = answer.match(/^[a-z][a-z\s]*$/);
    if (pass) {
        return true;
    }
    return (chalk.redBright("Enter valid name"));
};

const validateNum = answer => {
    const pass = answer.match('^[0-9]+$');
    if (pass) {
        return true;
    }
    return (chalk.redBright("Must be a number"));
};

