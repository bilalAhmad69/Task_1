const {Order} = require("../modules/order");
const {Customer} = require("../modules/customer")
const express = require("express");
const { isValidObjectId } = require("mongoose");
const router = express.Router();
router.get("/" ,async (req, res)=>{
    const order = await Order.find();
    res.send(JSON.stringify(order));
    
})
router.post("/" , async(req , res)=>{
      if(!isValidObjectId(req.params.customerId)) return res.status(400).send("Incorrect Id");
       const customer = await Customer.findById(req.body.customerId);
       if(!customer) return res.status(404).send("Customer not found");
       if(customer.cart.product.length <= 0) return res.send("Cart is empty");
       let net = 0;
       customer.cart.product.forEach(element=> {
            net +=   element.amount;
       });
       let order = await new Order({
            product:customer.cart.product,
            deliveryCharges:req.body.deliveryCharges,
            netTotal:net + req.body.deliveryCharges,
       });
       const error = order.validateSync();
       if(error) return res.status(400).send(error.message);
        order = await order.save();
       res.send(order);
   

});


module.exports = router;