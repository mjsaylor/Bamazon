const mysql = require("mysql");
const inquirer = require("inquirer");
const queries = require('./queries')

require("dotenv").config();

let connection = mysql.createConnection({
    host: process.env.CONNECTION_HOST,
    port: parseInt(process.env.CONNECTION_PORT),
    user: process.env.CONNECTION_USER,
    password: process.env.CONNECTION_PASS,
    database: process.env.CONNECTION_DATABASE
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayItems();
});

function displayItems() {
    queries.getAllProducts(connection, function (err, res) {
        if (err) throw err;

        for (let i = 0; i < res.length; i++) {
            console.log(`
            ID: ${res[i].item_id}
            Product: ${res[i].product_name}
            Department: ${res[i].department_name}
            Price: ${res[i].price}
            Stock Quantity: ${res[i].stock_quantity}
            `);
        }
        buyProduct(connection);
    });

}

function buyProduct(connection) {
    inquirer.prompt([
        {
            message: "What is the ID# of the product you'd like to buy?",
            name: "product_id",
            type: "number",
        },
        {
            message: "How many of the product would you like to purchase?",
            name: "product_quantity",
            type: "number",
        }
    ])
        .then(answers => {
            const productId = parseInt(answers.product_id)
            const purchaseQuantity = parseInt(answers.product_quantity)
            queries.getProductFromId(connection, productId, function (err, res) {
                if (err) throw err;
                
                const productName = res[0].product_name;
                const stockQuantity = res[0].stock_quantity;
                const productPrice = res[0].price;

                if(stockQuantity >= purchaseQuantity) {
                    const updatedQuantity = stockQuantity - purchaseQuantity;
                    queries.updateProductQuantity(connection, updatedQuantity, productId, function (err, res){
                        if (err) throw err;

                    console.log(`
                    You purchased ${purchaseQuantity} of "${productName}". 
                    You spent ${productPrice * purchaseQuantity} dollars.
                    ${updatedQuantity} of "${productName}" now remain.
                    `);
                        
                        connection.end();
                    }) 
                } else {
                    console.log("There is not enough in stock!");
                    connection.end();
                }
            })
        });
}
