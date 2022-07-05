const db = require("../db");

class Store {
    static async listProducts() {
        //run sql query to search database for all products and return list
        const results = await db.query(
            `
                SELECT * FROM products
            `
        );
    }
}

module.exports = Store;