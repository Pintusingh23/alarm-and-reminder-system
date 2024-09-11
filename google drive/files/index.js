const express=require("express");
const fs =express('fs')
const app =express()
app.get("/files/*",(req,res)=>{
    const path =req.params[0];
    try{
    const files = fs.readdirSync("./files/" + path)
    res.send(files)

    }
    catch (err){
        res.send(404,{
            message:"no directory found"
        })
   } })

app.listen("3000",()=>{
    console.log("server listening on 3000")
})