const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('index', {
        user: req.user
    });
});

router.get("/", (req, res) => {
    res.render('index');
});

router.get("/registration", (req, res) => {
    res.render('registration');
});

router.get("/login", (req, res) => {
    res.render('login');
});

router.get("/aboutus", (req, res) => {
    res.render('aboutus');
});

router.get("/cart", (req, res) => {
    res.render('cart');
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
    console.log(req.user);
    if (req.user) {
        res.render('profile', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    }
})

module.exports = router;