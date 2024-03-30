const mysql = require("mysql");
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

            if (!results || password !== results[0].password) {
                console.log('Incorrect email or password');
                return res.status(401).render('login', {
                    message: 'Email or Password is incorrect'
                });
            }

            const id = results[0].id;

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

        db.query("INSERT INTO users SET ?", { username, password, address, phone, email, birthdate, gender }, (error, results) => {
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
    if (req.session && req.session.userId) {
        req.user = true; // Set user to true if logged in
    } else {
        req.user = false; // Set user to false if not logged in
    }
    next();
}



exports.logout = async (req, res) => {
    res.status(200).redirect('/');
}
