const express = require("express");
const mongoose = require("mongoose");
const customer = require("./routes/customer");
const product = require("./routes/product");
const cart = require("./routes/cart");
const order = require("./routes/order");

const app = express();
app.use(express.json());
 
mongoose.connect("mongodb://localhost/shopping" )
.then(()=>console.log("Database Connected..."))
.catch((e)=>console.log(e.message));  
app.use("/api/customer" , customer);
app.use("/api/product", product);
app.use("/api/cart" , cart);
app.use("/api/order" , order);

app.listen("3000" , ()=>{
    console.log("listening on port 3000....")
})
