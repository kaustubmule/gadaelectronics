const mysql = require("mysql");
exports.showProducts = async (req, res) => {
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    });

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).send('An error occurred');
        }

        const { category } = req.query; // Assuming you're passing the category in the query string like /products?category=Smartphones
        let query = 'SELECT * FROM products';
        const params = [];

        if (category) {
            query += ' WHERE category = ?';
            params.push(category);
        }

        db.query(query, params, (error, results) => {
            if (error) {
                console.error('Error fetching products:', error);
                return res.status(500).send('An error occurred');
            }
            res.render('products', { products: results });
            db.end();
        });
    });
};
