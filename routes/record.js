var express = require('express');
var router = express.Router();

var query = require('../mysql/mysqlConnector');

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (req.method === 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
});


router.get('/addRecord', function (req, res, next) {
    var guastate = req.query.guastate;
    var stockname = req.query.name;
    var time = req.query.time;
    var content = req.query.content==null?"":req.query.content;
    var userid = req.query.userid;
    // 输出 JSON 格式
    var addSql = 'INSERT INTO user_record(guastate,stockname,time,content,userid) VALUES(?,?,?,?,?)';
    var addSqlParArr = [guastate, stockname, time, content, userid];
    query(addSql, addSqlParArr, function (err, rows, fields) {
        if (err) {
            var message = {
                "err": err,
                "code": 500
            }
            console.log(err);
            res.send(message);
        } else {
            console.log(userid);
            var respData = {
                "code": 200,
                "message": Date.now(),
                "success": true
            }
            res.send(respData);
        }
    });
});

router.get('/findrecord', function (req, res, next) {
    var userid = req.query.userid;

    var addSql = 'select * from user_record where userid=' + userid;
    var addSqlParArr = [userid];
    query(addSql, addSqlParArr, function (err, recData, fields) {
        if (err) {
            var message = {
                "err": err,
                "code": 500
            }
            res.send(message);
        } else {
            var arr=sortRecordArr(recData)
            res.send(arr);
        }
    });
});

router.get('/deleltRecord', function (req, res, next) {
    var userid = req.query.userid;

    // 输出 JSON 格式
    var addSql = 'delete from user_record where  userid=' + userid;
    var addSqlParArr = [userid];
    query(addSql, addSqlParArr, function (err, rows, fields) {
        if (err) {
            var message = {
                "err": err,
                "code": 500
            }
            res.send(message);
        } else {
            var respData = {
                "data": "response",
                "code": 200,
                "message": Date.now(),
                "success": "清除成功！"
            }
            res.send(respData);
        }
    });
});

module.exports = router;

function sortRecordArr(arr){
    var newArr=[];
    for(let i=arr.length-1;i>=0;i--){
        newArr.push(arr[i]);
    }
    return newArr;
};