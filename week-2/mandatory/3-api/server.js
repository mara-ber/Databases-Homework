const express = require('express');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'password',
    port: 5432
});

app.get("/customers", (req, res) => {
    pool.query('SELECT * FROM customers', (error, result) => {
        res.json(result.rows);
    });
});

app.get("/suppliers", (req, res) => {
    pool.query('SELECT * FROM suppliers', (error, result) => {
        res.json(result.rows);
    });
});

// app.get("/products", (req, res) => {
//     pool.query('SELECT product_name, supplier_name FROM products INNER JOIN suppliers ON supplier_id=suppliers.id', (error, result) => {
//         res.json(result.rows);
//     });
// });

app.get("/products", function (req, res) {
    const nameQuery = req.query.name;
    let query = 'select * from products order by product_name';

    if (nameQuery) {
        query = "select * from products where product_name like $1 order by product_name";
        pool.query(query, [`%${nameQuery}%`])
            .then((result) => {
                return res.json(result.rows);
            });
    } else {
        pool.query(query, (error, result) => {
            res.json(result.rows);
        });
    }
});

const listener = app.listen(3000, function () {
    console.log("Your app is listening on port 3000");
});