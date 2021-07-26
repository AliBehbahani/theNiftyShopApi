//databases
const { Order, OrderItem } = require("../../db/models");
//********************************************************************************** */

exports.checkout = async (req, res, next) => {
  try {
    const newOrder = await Order.create({ userId: req.user.id });
    const recieved = req.body.map((item) => ({
      ...item,
      orderId: newOrder.id,
    }));
    const newItems = await OrderItem.bulkCreate(recieved);
    res.status(201).json(newItems);
  } catch (error) {
    next(error);
  }
};
