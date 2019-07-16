const mysql = require("mysql");
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "bamazon_DB"

});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();

});

function runSearch(){
    console.log('\n');
    inquirer
    .prompt({
        name: "action",
        type: "rawlist",
        message: "\nWhat would you like to do? \n",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "exit\n"
        ]

    }).then(function(answer){
        switch(answer.action){
            case "View Products for Sale":
                productsForSale();
                break;
            
            case "View Low Inventory":
                inventoryView();
                break;

            case "Add to Inventory":
                addToInventory();
                break;
                
            case "Add New Product":
                newProduct();
                break;

            case "exit/n":
                connection.end();
                break;

        }

    });

}

function productsForSale (){
    
    connection.query(`SELECT * FROM products`, (err, products) => {
        const list = []
        console.log('\n');
        
        if (err) throw err
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
            runSearch();
                   
    });   
    
};


function inventoryView (){
    connection.query(`SELECT product_name, stock_quantity FROM products  WHERE stock_quantity < 5`, (err, products) => {
        const list = []
        console.log('\n');
        
        products.forEach(product => {

            const temp = {
            
                "Product name": product.product_name,
                "stock quantity": product.stock_quantity
            }

            list.push(temp)
        });

        console.table(list)
        runSearch();
    });
    
};

function addToInventory(){
    console.log(chalk.bold.yellow("\nYou're avalaible to add more products\n"));
    inquirer
    .prompt([
        {
            name: "idProduct",
            type: 'input',
            message: "Enter Product ID",
            validate: function (value) {
                const valid = !isNaN(parseFloat(value));
                return valid || "Please enter a number";
            },
            filter: Number
        },
        {
            name: "quantity",
            type: 'input',
            message: "Enter Product quantity",
            validate: function (value) {
                const valid = !isNaN(parseFloat(value));
                return valid || "Please enter a number";
            },
            filter: Number

        }]).then(function(answers){
            console.log(answers);

        connection.query("UPDATE products SET stock_quantity=stock_quantity + ? WHERE item_id=?",
        [answers.quantity, answers.idProduct],
        (err, products) => {
            if(err) throw err;
            console.log("\nSuccessfully added stock quatity")
        });
        productsForSale();
    });

};

function newProduct(){
    console.log(chalk.bold.yellow('\nPlease, add the new product: \n'))

    inquirer
    .prompt([
        {
            name: "productName",
            type: 'input',
            message: "Type the name of the product:"
        },
        {
            name: "departmentName",
            type: 'input',
            message: "Type the product department's name:"
        },
        {
            name: "price",
            type: 'input',
            message: "Type the product's price:",
            validate: function (value) {
                const valid = !isNaN(parseFloat(value));
                return valid || "Please enter a number";
            },
            filter: Number
        },
        {
            name: "stockQuantity",
            type: 'input',
            message: "Type the product stock quantity:",
            validate: function (value) {
                const valid = !isNaN(parseFloat(value));
                return valid || "Please enter a number";
            },
            filter: Number
            
        }
    ]).then(function(res){
      
        connection.query( "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES( ?, ?, ?, ?)",
        [res.productName, res.departmentName, res.price, res.stockQuantity],
        (err, products) => {
            if(err) throw err;
            console.log("\nProduct was updated successfull");
        });

        productsForSale();
    })    


};