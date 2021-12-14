const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  product: [new mongoose.Schema({
        name: {
        type:String,
        required:true,
        minlength : 3,
        maxlength : 100,
      },
    price:{
        type:Number,
        required:true,
        min:0,
    }, 
    amount:{
      type:Number,
      required:true
    },
    quantity:{
      type:Number,
    }
    })],
    deliveryCharges:{
      type:Number,
      required:true,
      min:0,
    },
    netTotal:{
      type:Number,
      reuired:true
    }
  

});
const Order = new mongoose.model("Order", orderSchema);
exports.Order = Order;