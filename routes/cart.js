const {Customer} = require("../modules/customer");
const {Product} =  require("../modules/product");
const { isValidObjectId } = require("mongoose");
const express = require("express");
const router = express.Router();
router.get("/" , (req,res)=>{
    res.send("Hello Cart");
});
router.post("/" , async(req,res)=>{
   if(!isValidObjectId(req.body.customerId)) return res.status(400).send("Given Id is not Valid");
   let customer = await Customer.findById(req.body.customerId);
   if(!customer) return res.status(404).send("Customer not found");
   if(!isValidObjectId(req.body.productId)) return res.status(400).send("Given Id is not Valid");
   const product = await Product.findById(req.body.productId);
   if(!product) return res.status(404).send("product not found");
      const prod = {
        name:product.name,
        price:product.price,
        quantity:req.body.quantity,
        amount:req.body.quantity*product.price,
      }
      console.log(prod);
    customer.cart.product.push(prod);
    const error = customer.validateSync();
    if(error) return res.status(400).send(error);
  customer = await customer.save();
   res.send(customer);
});
module.exports = router;