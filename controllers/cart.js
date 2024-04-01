exports.addToCart = async (req, res) => {
    const userId = req.session.userId;
    const productId = req.body.productId;

    console.log('User ID:', userId);
    console.log('Product ID:', productId);

    if (!userId || !productId) {
        console.error('User ID and Product ID are required');
        return res.status(400).send('User ID and Product ID are required');
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).send('An error occurred');
        }

        console.log('Connected to database');

        const query = 'INSERT INTO cart (user_id, product_id) VALUES (?, ?)';
        console.log('Query:', query, 'Values:', [userId, productId]);

        connection.query(query, [userId, productId], (error, result) => {
            connection.release();

            if (error) {
                console.error('Error adding product to cart:', error);
                return res.status(500).send('An error occurred');
            }

            console.log('Product added to cart successfully');
            res.send('Product added to cart successfully');
        });
    });
};
exports.addToCart = async (req, res) => {
    const userId = req.session.userId;
    const productId = req.body.productId;

    console.log('User ID:', userId);
    console.log('Product ID:', productId);

    if (!userId || !productId) {
        console.error('User ID and Product ID are required');
        return res.status(400).send('User ID and Product ID are required');
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return res.status(500).send('An error occurred');
        }

        console.log('Connected to database');

        const query = 'INSERT INTO cart (user_id, product_id) VALUES (?, ?)';
        console.log('Query:', query, 'Values:', [userId, productId]);

        connection.query(query, [userId, productId], (error, result) => {
            connection.release();

            if (error) {
                console.error('Error adding product to cart:', error);
                return res.status(500).send('An error occurred');
            }

            console.log('Product added to cart successfully');
            res.send('Product added to cart successfully');
        });
    });
};
