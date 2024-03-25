const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require('util');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', {
                message: 'Please provide an email and password'
            });
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.error('Error in database query:', error);
                return res.status(500).send('An error occurred');
            }

            if (!results || !(await bcrypt.compare(password, results[0].password))) {
                console.log('Incorrect email or password');
                return res.status(401).render('login', {
                    message: 'Email or Password is incorrect'
                });
            }

            const id = results[0].id;

            const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            }

            res.cookie('jwt', token, cookieOptions);
            res.status(200).redirect('/');
        });
    } catch (error) {
        console.log('Login error:', error);
        res.status(500).send('An error occurred during login');
    }
}

exports.registration = async (req, res) => {
    const { username, password, confirmPassword, address, phone, email, birthdate, gender } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 8);

        const results = await db.query("SELECT email FROM users WHERE email = ?", [email]);

        if (results.length > 0) {
            return res.render('registration', {
                message: "That email is already in use"
            });
        } else if (password !== confirmPassword) {
            return res.render('registration', {
                message: "Passwords do not match"
            });
        }

        db.query("INSERT INTO users SET ?", { username, password: hashedPassword, address, phone, email, birthdate, gender }, (error, results) => {
            if (error) {
                console.log(error)
                return res.status(500).send("An error occurred during registration");
            }

            console.log(results);
            return res.render('registration', {
                message: "User registered"
            });
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send("An error occurred during registration");
    }
}

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

            db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
                if (!result || error) {
                    return next();
                }

                req.user = result[0];
                return next();
            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        next();
    }
}

exports.logout = async (req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });

    res.status(200).redirect('/');
}
