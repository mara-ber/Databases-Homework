const express = require('express');
const app = express();
const { Pool } = require('pg');
app.use(express.json());

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

app.get('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    pool.query('select * from customers where id=$1', [customerId])
        .then((result) => {
            if (result.rows.length > 0) {
                return res.json(result.rows);
            } else {
                res.status(400).send(`no customer with ID ${customerId}`);
            }
        });
})

app.get("/suppliers", (req, res) => {
    pool.query('SELECT * FROM suppliers', (error, result) => {
        res.json(result.rows);
    });
});


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

app.post('/customers', (req, res) => {
    const newCustomer = req.body.name;
    const newCustomerAddress = req.body.address;
    const newCustomerCity = req.body.city;
    const newCustomerCountry = req.body.country;

    pool
        .query("SELECT * FROM customers WHERE name=$1", [newCustomer])
        .then((result) => {
            if (result.rows.length > 0) {
                return res.status(400).send("Existing customer");
            }
            const query = "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";
            pool
                .query(query, [newCustomer, newCustomerAddress, newCustomerCity, newCustomerCountry])
                .then(() => res.send("New customer is added"))
                .catch(() => res.status(400).send("Falled to add a new customer"));
        });
})

const listener = app.listen(3000, function () {
    console.log("Your app is listening on port 3000");
});