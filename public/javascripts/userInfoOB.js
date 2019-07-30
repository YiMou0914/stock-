var query = require('../../mysql/mysqlConnector');
var express = require('express');
var router = express.Router();

router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

function romdomUserID(){
    var id="";
    for(let i=0;i<6;i++){
        id+=Math.floor(Math.random()*10);
    }
    return id;
    var state=findNewUserId(id);
    if(!state){
        romdomUserID();
    }else{
        return id;
    }
}

function findNewUserId(id){
    var addSql = 'select * from userinfo where id=' + id;
    var addSqlParArr = [id];
    query(addSql, addSqlParArr, function (err, userData, fields) {
        if (err) {
            return false;
        } else {
            if(userData.length>0){
                return false;
            }else{
                return true;
            }
        }
      });
}

module.exports =romdomUserID;