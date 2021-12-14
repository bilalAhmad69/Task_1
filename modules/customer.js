const mongoose = require("mongoose");
const Joi = require("joi");
const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    phone:{
        type:String,
        required:true,
        minlength:11,
        maxlength:11
    },
    address:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255     
    },
    cart:{
        product: [{
                  name:{
                      type:String,
                      required:true,
                      minlength:3,
                      maxlength:100
                  },
                  price:{
                      type:Number,
                      required:true,
                      min:0
                  },
                  quantity:{
                      type:Number,
                      default:1
                  },
                  date:{
                    type:Date,
                    required:true,
                    default: Date.now()
                },
                amount:
                {
                    type:Number,
                    required:true
                }
        }],
      
      
    }
});
// function validateCustomer(customer)
// {

//         customer.name=Joi.string().min(3).max(50).required(),
//         customer.phone = Joi.string().min(11).max(11).required(),
//         customer.address = Joi.string().min(5).max(255).required()
  
// }
const Customer =  mongoose.model("Customer" , customerSchema);
exports.Customer = Customer;
// exports.validateCustomer = validateCustomer;