const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Order {
    static async listOrdersForUser() {
        //return all orders that the authenticated user has created

        const results = await db.query(
            `
                SELECT orders.id AS "orderId",
                    orders.customer_id AS "customerId",
                    order_details.quantity AS quantity,
                    products.name AS name,
                    products.price AS price
                    FROM orders
                        JOIN order_details ON orders.id = order_details.order_id
                        JOIN products ON products.id = orders_details.product_id
                    WHERE orders.customer_id = 
            `
        );
    }

    static async createOrder({ user, order }) {
        //take a user's order and store it in the database

        // const requiredFields = ["customer_id"];
        // requiredFields.forEach(field => {
        //     if(!order.hasOwnProperty(field)) {
        //         throw new BadRequestError(`Required field - ${field} - missing from request body.`);
        //     }
        // })

        if (!order.hasOwnProperty("customer_id")) {
            throw new BadRequestError(
                `Required field - ${field} - missing from request body.`
            );
        }

        const results = await db.query(
            `
                INSERT INTO orders (customer_id, user_id)
                VALUES ($1, (SELECT id FROM users WHERE email = $2))
                RETURNING id
            `, [order.customer_id, user.email]
        );

        const orderId = results.rows[0];

        order.forEach(async(item) => {
            const query = await db.query(
                `
                    INSERT INTO order_details (order_id, product_id, quantity)
                    VALUES ($1, $2, $3)
                    RETURNING order_id,
                        product_id,
                        quantity
                `, [orderId, item.id, item.quantity]
            );
        });
    }
}

module.exports = Order;