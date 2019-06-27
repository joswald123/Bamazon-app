var mysql = require("mysql");
var inquirer = require('inquirer');
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
    connection.query(`SELECT * FROM products`, (err, products) => {
        const list = []
        products.forEach(product => {

            const temp = {
                "ID": product.item_id,
                "Product name": product.product_name,
                "Price": product.price,
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
                console.log(JSON.stringify(answers, null, "  "));

                // call database and lookup customer's request

                var query ="SELECT item_id, stock_quantity FROM products";
                connection.query(query, function (err, res){
                    if(err) throw err;
                    // for (var i = 0; i < res.length; i++) {
                    console.log(res);
                    }

                );

                //compare if i have enough quantity 
                    // depending on my the comparasion i will update sql or not
            });


};