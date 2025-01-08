const express = require("express");
const mysql = require("mysql");
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');


dotenv.config({
    path: './.env'
})

const app = express();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


app.use(session({
    secret: 'your_secret_key_here',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'hbs');

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MySQL Connected");
    }
})


app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

app.listen(8080, () => {
    console.log("Server started on Port 5000");
});

