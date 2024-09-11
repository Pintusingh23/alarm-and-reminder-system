// const  db = require('./randam');
// class User{
//     constructor(name ){
//         this.db=db
//         console.log(name)
//     }
//     getAll=() =>{
//         const query='select* from Users'
//         this.db.query(query,(err,data)=>{
//             if (!err){console.log(data,1)}
       
//         })
//     getByid(id){
//         return new Promise((resolve, reject) => {
//             const query="select* from connecrion"
//             this.db.query(query,(err,dat)=>{
//                 if (err)rej(err)
//                     resolve(data)
//             })
//         })
//     }
    

        
//     // }
// }
// const user=new User(db)
// console.log(user.getAll())
// const db = require('./db');
// class User {
//     constructor() {
//         this.db = db;
//     }
//     getAll(callback) {
//         const sql = 'SELECT * FROM users';
//         this.db.query(sql, (err, results) => {
//             if (err) {
//                 return callback(err, null);
//             }
//             callback(null, results);
//         });
//     }
//     getById(id, callback) {
//         const sql = 'SELECT * FROM users WHERE id = ?';
//         this.db.query(sql, [id], (err, results) => {
//             if (err) {
//                 return callback(err, null);
//             }
//             callback(null, results[0]);
//         });
//     }
//     create(username, email, callback) {
//         const sql = 'INSERT INTO users (username, email) VALUES (?, ?)';
//         this.db.query(sql, [username, email], (err, result) => {
//             if (err) {
//                 return callback(err, null);
//             }
//             callback(null, result.insertId);
//         });
//     }
//     update(id, username, email, callback) {
//         const sql = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
//         this.db.query(sql, [username, email, id], (err, result) => {
//             if (err) {
//                 return callback(err, null);
//             }
//             callback(null, result.affectedRows);
//         });
//     }
//     delete(id, callback) {
//         const sql = 'DELETE FROM users WHERE id = ?';
//         this.db.query(sql, [id], (err, result) => {
//             if (err) {
//                 return callback(err, null);
//             }
//             callback(null, result.affectedRows);
//         });
//     }
// }
// module.exports = User;











// // Message advance-programming










 


