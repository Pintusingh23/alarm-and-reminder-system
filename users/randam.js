const mysql=require('mysql2')
const connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"Pintu143",
    database:"advancePrograming"


})
    connection.connect((err)=>{
        if (!err){console.log('success');}

    })
module .exports=connection    