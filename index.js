const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const figlet = require('figlet');
const chalk = require('chalk');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'AJH@',
        database: 'roster_db'
    },
    console.log('Connected to roster_db')
);

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});