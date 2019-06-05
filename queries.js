//get all products
    //SELECT * FROM products

function getAllProducts(connection, callback){
    connection.query(`SELECT * FROM products`, callback)
}


//get one product
    //SELECT * FROM products WHERE item_id = ${productId}

function getProductFromId(connection, id, callback) {
    connection.query(`SELECT * FROM products WHERE item_id = ${id}`, callback)
}

//update one product stock_quantity
    //UPDATE products SET stock_quantity = ${quantity} WHERE item_id = ${productId}
function updateProductQuantity(connection, quantity, id, callback) {
//    console.log("This is updated")
    connection.query(`UPDATE products SET stock_quantity = ${quantity} WHERE item_id = ${id}`, callback)
}

module.exports = {getAllProducts, getProductFromId, updateProductQuantity}