const Razorpay = require("razorpay");
const Order = require("../models/orders");

exports.purchasePremium = async (req, res) => {
  try {
    var rzp = new Razorpay({
      key_id: "rzp_test_Fu5KouQiQP5mJb",
      key_secret: "BxmelgSmAiHMEpob4vkZCW0O",
    });
    const amount = 2500;
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      req.user
        .createOrder({ orderId: order.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (error) {
    res.status(403).json({ message: "something went wrong", error: error });
  }
};

exports.updateTransactionStatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderId: order_id } });
    if (order) {
      order.update({ paymentId: payment_id, status: "SUCCESSFUL" });
    }
    await req.user.update({ isPremium: true });
    return res
      .status(202)
      .json({ success: true, message: "Transaction Successfull" });
  } catch (error) {
    res.status(403).json({ message: "something went wrong", error: error });
  }
};
