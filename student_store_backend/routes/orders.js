const express = require("express");
const security = require("../middleware/security");
const Order = require("../models/order");
const router = express.Router();

router.get("/", security.requireAuthenticatedUser, async(req, res, next) => {
    try {
        const { user } = res.locals;
        const orders = await Order.listOrdersForUser(user, req.body);
        return res.status(200).json({ orders });
    } catch (err) {
        next(err);
    }
});

router.post("/", security.requireAuthenticatedUser, async(req, res, next) => {
    try {
        const { user } = res.locals;
        const order = await Order.createOrder({...req.body, user });
        return res.status(201).json({ order });
    } catch (err) {
        next(err);
    }
});

module.exports = router;