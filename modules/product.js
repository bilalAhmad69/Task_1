const mongoose = require("mongoose");
const productSchema =new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
        minlength : 3,
        maxlength : 100,
    },
    price:
    {
        type:Number,
        required:true,
        min:0,
    },
    
});
const Product = mongoose.model("Product", productSchema);
exports.Product = Product;