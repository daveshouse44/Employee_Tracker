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