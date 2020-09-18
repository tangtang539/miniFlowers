const express=require("express");
const app=express();
app.listen(3000);
const cors=require('cors');
const bodyParser=require("body-parser");
const userRouter=require("./router/user.js");
const productRouter=require("./router/product.js");
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(cors({
    origin:["http://127.0.0.1:8080","http://localhost:8080"]
}));
app.use(express.static("./public"));
app.use("/user",userRouter);
app.use("/product",productRouter);