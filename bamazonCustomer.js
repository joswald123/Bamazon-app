const mysql = require("mysql");
const inquirer = require('inquirer');
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "bamazon_DB"

});

connection.connect(function (err) {
    if (err) throw err;

    getAllProducts();

})

const getAllProducts = function () {
    console.log('\n\nWelcome to Bamazon! \n\n');

    connection.query(`SELECT * FROM products`, (err, products) => {
        const list = []
        products.forEach(product => {

            const temp = {
                "ID": product.item_id,
                "Product name": product.product_name,
                "Price": `$ ${product.price}`,
                "stock quantity": product.stock_quantity
            }
            list.push(temp)


        });
        console.table(list)
        customerOption();
    })

};

const customerOption = function () {
    inquirer
        .prompt([

            {
                type: 'input',
                name: "Id",
                message: 'Type the ID of the product you would like to buy',
                validate: function (value) {
                    const valid = !isNaN(parseFloat(value));
                    return valid || "Please enter a number";
                },
                filter: Number
            },
            {
                type: "input",
                name: "quantity",
                message: "How many units do you need",
                validate: function (value) {
                    const valid = !isNaN(parseFloat(value));
                    return valid || "Please enter a number";
                },
                filter: Number

            }]).then(function (answers) {
             
           //------call database and lookup customer's request-------------

                let query = "SELECT item_id, price, stock_quantity FROM products WHERE ?";
                connection.query(query, [{ item_id: answers.Id }], function (err, res) {
                    if (err) throw err;
                    if (answers.quantity <= res[0].stock_quantity) {
                        connection.query("UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: `${res[0].stock_quantity - answers.quantity}`
                                },
                                {
                                    item_id: answers.Id
                                }

                            ],function(){
                                console.log(`Your order was successful and your Total is $${res[0].price * answers.quantity}`)
                            });


                    } else if (answers.quantity >= res[0].stock_quantity) {
                        console.log("Insufficient quantity!");
                    }
                });
            });
};


