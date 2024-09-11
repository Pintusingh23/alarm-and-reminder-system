const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
createPool.getConnection().then((connection)=>{

const { query } = require("express")

  console.log("db connected successfuly");
  app.listen(port,()=>{
    console.log(`server is running on part ${port}`);
    connection.relese();
  });

  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connection.relese();
});
app.get("/api/users/get",getIsers);
app.delete("/api/Users/delete/:id",deleteUSers)
module.exports = app;
// const db= require('db.js');
// Class User{
//   constructor(db){
//     this.db=db
//   }


// getAll.function(){
//   return new Promise((resolve, reject) => {
//     this.db .query(query,(err,data)=>{
//       if (err)resolve(err)
//         resolve(data)
//     })
//   })
// }
// const user=new User()
// console.log(await user getAll)