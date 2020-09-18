const express=require("express");
const router=express.Router();
const pool=require("../pool.js");
const cors=require('cors');
router.use(cors({
    origin:["http://127.0.0.1:8080","http://localhost:8080"]
}));
router.post("/register",(req,res)=>{
    let upwd=req.body.upwd;
    let phone=req.body.phone;
    let sql="insert into users(upwd,phone) VALUES(?,?)";
    pool.query(sql,[upwd,phone],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({message:"注册成功",code:1});
        }else{
            res.send({message:"注册失败",code:0});
        }
    });
});
router.get("/login",(req,res)=>{
    let _phone=req.query.phone;
    let _upwd=req.query.upwd;
    let sql="select phone from users where phone=? and upwd=?"
    pool.query(sql,[_phone,_upwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({message:"登录成功",code:1});
        }else{
            res.send({message:"登录失败",code:0});

        }
    });
});
module.exports=router;