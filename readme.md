Bamazon - App

This app is created to be an Amazon-like storefront with MySQL. The app will take in orders from customers and deplete stock from the store's inventory.
 
Created it with MySQL and Inquirer npm packages for data input and storage and console.table to organize the data requested.

Challenge #1: Customer View

By Node application called bamazonCustomer.js. Running this application it displays first all of the items available for sale in a table called Products  with the following columns:

1. item_id (unique id for each product)
2. product_name (Name of product)
3. department_name
4. price (cost to customer)
5. stock_quantity (how much of the product is available in stores)

![](img/Customerview-productstable)

Second, the app will prompt users with two messages.

The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.

-----image-------

Once the customer has placed the order, the application check if the store has enough of the product to meet the customer's request and the database from mysql is updated reflecting the remaining quantity. Once the update goes through, we'll show the customer the total cost of their purchase.

----image------

If not, the app log a phrase like Insufficient quantity!, and prevent the order from going through.

----image-------------

Challenge #2: Manager View

This view displays the following information:

a List a set of menu options to have differents option for the manager:

1. View Products for Sale
2. View Low Inventory
3. Add to Inventory
4. Add New Product

------image-------

If a manager selects View Products for Sale, the app shows a table listing every available item: 

1. item_id (unique id for each product)
2. product_name (Name of product)
3. department_name
4. price (cost to customer)
5. stock_quantity (how much of the product is available in stores)

------image----------------


If a manager selects View Low Inventory, then it show them a list all items with an inventory count lower than five.

-------image----------------


If a manager selects Add to Inventory, app displays a prompt that will let the manager "add more" of any item currently in the store. with   connection query function we can add more products to our database.

----image-------


If a manager selects Add New Product, it allows the manager to add a completely new product to the store updating our mysql database.

----- image-----

