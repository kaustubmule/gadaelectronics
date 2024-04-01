const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const productsController = require("../controllers/products");
const db = require('../config/db');
router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('index', {
        user: req.user,
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/products/:category', async (req, res) => {
    const { category } = req.params;

    try {
        const products = await db.query('SELECT * FROM products WHERE category = ?', [category]);
        res.render('products', { category, products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('An error occurred');
    }
});

router.get("/registration", (req, res) => {
    res.render('registration');
});

router.get('/products', productsController.showProducts);


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
});

module.exports = router;
