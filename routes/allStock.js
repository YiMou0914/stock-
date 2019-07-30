var express = require('express');
var router = express.Router();

var query = require('../mysql/mysqlConnector');
var byPinYin = require('../public/javascripts/Convert_Pinyin');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

router.get('/findStock', function (req, res, next) {
    var key = req.query.key;
    var isNumber=parseFloat(key).toString();
    console.log(isNumber);
    if(isNumber=='NaN'){
        var addSql = "select * from all_stock where pinyin like '"+key+"%'";
    }else{
        var addSql = "select * from all_stock where id like '"+key+"%'";
    }
    // 输出 JSON 格式
    var addSqlParArr = [key];
    query(addSql, addSqlParArr, function (err, data, fields) {
        if (err) {
            res.send(false);
        } else {
            console.log("data.length====="+data.length);
            res.send(data);
        }
    });
});

module.exports = router