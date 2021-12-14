const {Customer} = require("../modules/customer");
const express = require("express");
const { isValidObjectId } = require("mongoose");
const router = express.Router();
router.get("/" , async(req , res) =>
{
  const customer = await Customer.find().sort("name");
  res.send(customer);   
});
router.get("/:id" , async(req , res)=>{
    try{
    if(!isValidObjectId(req.params.id)) return res.status(400).send("Customer Id is not valid");
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send("customer not found");
    res.send(customer);
    }
    catch (e)
    {
      console.log(e.message);
    }

})
router.post("/" , async(req, res)=>
{
    try{
    let customer = new Customer({
        name : req.body.name,
        phone : req.body.phone,
        address : req.body.address
    });
    const error = customer.validateSync();
    if(error) return res.status(400).send(error.message);
    customer = await customer.save();
    res.send(customer);
    }
    catch (e)
    {
      console.log(e.message);
    } 
});
router.put("/:id" , async(req , res)=>
{
    try{
      
    if(!isValidObjectId(req.params.id)) return res.status(400).send("Customer Id is not valid");
    let customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(400).send("customer not found ...");
    customer.name = req.body.name || customer.name;
    customer.phone = req.body.phone ||customer.phone;
    customer.address = req.body.address || customer.address;
    const error = customer.validateSync();
    if(error) return res.status(400).send(error.message);
    customer = await customer.save();
    res.send(customer);

       }
    catch(e)
    {
        console.log(e.message);
    }
} );
router.delete("/:id" , async(req , res) =>
{
    try{
    if(!isValidObjectId(req.params.id)) return res.status(400).send("Customer Id is not valid");
    const customer = await Customer.findByIdAndRemove(req.params.id);
    res.send(customer);
    }
    catch(e)
    {
        console.log(e.message);
    }
});




module.exports = router;