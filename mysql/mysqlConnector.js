const mysql = require("mysql");

// var sql = mysql.createConnection({
//     host: "192.168.1.25",
//     port: "3306",
//     user: "root",
//     password: "zhoujia",
//     database: "test_zj"
// });

// 链接mysql数据库
var pool = mysql.createPool({
    host: "192.168.1.128",
    port: "3306",
    user: "root",
    password: "zhoujia",
    database: "stock"
})
// 连接公用方法
var query = function (sql, options, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, options, function (err, results, fields) {
                //释放连接  
                conn.release();
                //事件驱动回调  
                callback(err, results, fields);
            });
        }
    });
};

module.exports = query;

// sql.connect((err,result)=>{
//     if(err){
//         console.log("err: "+err);
//     }else{
//         console.log("连接成功")
//         // console.log(result)
//     }
// })

// module.exports={
//     //删除数据
//     deleteUserInfo:function(tableName,id,callback){
//         sql.query("delete from "+tableName+" where id="+id+";", (err, data) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(JSON.stringify(data));
//                 callback(data);
//             }
//         });
//     },

//     //查找数据
//     showClassInfo:function(tableName,callback){
//         console.log("=============="+tableName+"===============");
//         sql.query('select * from '+tableName, function(err, data){
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(JSON.stringify(data));
//                 callback(data);
//             }
//         });
//     },

//     //添加数据
//     addUserInfo:function(tableName,name,id,phone,sex,age,callback){
//         sql.query('insert into '+tableName +' set ?',{'name':name,'id':id,'phone':phone,'sex':sex,'age':age}, function(err, data){
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(JSON.stringify(data));
//                 callback(data);
//             }
//         });
//     },

//     //修改数据
//     setUserInfo:function(tableName,id,sex,callback){
//         sql.query("update "+tableName+" set sex="+sex+" where id="+id+";",function(err, data){
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(JSON.stringify(data));
//                 callback(data);
//             }
//         });
//     },
// };