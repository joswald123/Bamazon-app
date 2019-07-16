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

![](img/Customer%20view-products%20table.PNG)

Second, the app will prompt users with two messages.

The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.

![](img/Customer%20view-options%20to%20sale.PNG)

Once the customer has placed the order, the application check if the store has enough of the product to meet the customer's request and the database from mysql is updated reflecting the remaining quantity. Once the update goes through, we'll show the customer the total cost of their purchase.

![](img/Customer%20view-answer%20successful%20to%20sale.PNG)

If not, the app shows a phrase like Insufficient quantity!, and prevent the order from going through.

![](img/Customer%20view-answer%20unsuccessful%20to%20sale.PNG)

Challenge #2: Manager View

This view displays the following information:

a List a set of menu options to have differents option for the manager:

1. View Products for Sale
2. View Low Inventory
3. Add to Inventory
4. Add New Product

![](img/Manager%20view-switch%20function%20(options).PNG)

If a manager selects View Products for Sale, the app shows a table listing every available item: 

1. item_id
2. product_name
3. department_name
4. price
5. stock_quantity

![](img/Manager%20view-productsforsale.PNG)


If a manager selects View Low Inventory, then it show them a list all items with an inventory count lower than five.

![](img/Manager%20view-low%20inventory.PNG)


If a manager selects Add to Inventory, app displays a prompt that will let the manager "add more" of any item currently in the store. with   connection query function we can add more products to our database.

![](img/Manager%20view-new%20products%201.PNG)
![](img/Manager%20view-new%20products%202.PNG)

If a manager selects Add New Product, it allows the manager to add a completely new product to the store updating our mysql database.

![](img/Manager%20view-new%20products%20updated.PNG)

