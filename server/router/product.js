const express=require('express');
const router=express.Router();
const pool=require('../pool.js');
const cors=require('cors');
router.use(cors({
    origin:['http://127.0.0.1:8080','http://localhost:8080']
}));

router.get('/flow',(req,res)=>{
    let pid=req.query.category;
    let sql='SELECT lid,image,title FROM classify WHERE category=?';
    pool.query(sql,[pid],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
});

router.get('/pro',(req,res)=>{
    let pid=req.query.category;
    let sql='SELECT lid,image,smalltitle,title,price,sales,onsale FROM products WHERE category=?';
    pool.query(sql,[pid],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
});

router.get('/details',(req,res)=>{
    let lid=req.query.lid;
    let sql='SELECT image,title,price,sales,onsale,fit,purpose,allimage FROM products WHERE lid=?';
    pool.query(sql,[lid],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
});

router.get('/search',(req,res)=>{
    let title=req.query.title;
    let sql="SELECT image,title,price,sales,onsale,fit,purpose,allimage FROM products WHERE title LIKE '%"+title+"%'";
    pool.query(sql,(err,result)=>{
      if(err) throw err;
      if(result.length>0){
        res.send({message:'查询到结果',code:1,data:result});
      }else{
        res.send({message:'查询失败',code:0});
      }
    })
});

module.exports=router;