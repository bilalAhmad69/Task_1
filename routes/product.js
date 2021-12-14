const {Product }= require("../modules/product")
const express = require("express");
const { isValidObjectId } = require("mongoose");
const router = express.Router();
router.get("/", async (req,res) =>
{
    const product = await Product.find();
    res.send(product);

});
router.get("/:id" , async(req,res)=>
{ 
    if(!isValidObjectId(req.params.id)) return res.status(400).send("Given Id is not Valid");
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).send("Product not found");
    res.send(product);
    
})
router.post("/", async(req,res)=>
{
   try{
    let product = new Product({
        name:req.body.name,
        price:req.body.price
    });
    const error = product.validateSync();
    if(error) return res.status(400).send(error.message);
    product = await product.save();
    res.send(product);
   }
   catch(e)
   {
       console.log(e.message);
   }
});
router.put("/:id" , async(req,res)=>
{
    if(!isValidObjectId(req.params.id)) return res.status(400).send("Given Id is not Valid");
    let product = await Product.findById(req.params.id);
    if(!product)return res.status(404).send("Product was not found");
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    const error = product.validateSync();
    if(error) return res.status(400).send(e.message);
    product = await product.save();
    res.send(product);
} );
router.delete("/:id" ,async  (req, res)=>
{
    if(!isValidObjectId(req.params.id)) return res.status(400).send("Given Id is not Valid");
    const product = await Product.findByIdAndRemove(req.params.id);
    res.send(product);
})
module.exports = router;
