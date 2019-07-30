var express = require('express');
var router = express.Router();

var query = require('../mysql/mysqlConnector');
var collect = require('../public/javascripts/collectBO')

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


router.get('/addstock', function (req, res, next) {
    var xianjia = req.query.xianjia;
    var stockname = req.query.stockname;
    var zhangdie = req.query.zhangdie;
    var zhangfu = req.query.zhangfu;
    var userid = req.query.userid;
    var code = req.query.code;
    var jinKai = req.query.jinKai;
    // 输出 JSON 格式
    var addSql = 'insert into stockcollect(stockname, userid, xianjia, zhangdie, zhangfu,jinKai,code) VALUES(?,?,?,?,?,?,?)';
    var addSqlParArr = [stockname, userid, xianjia, zhangdie, zhangfu, jinKai, code];
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

router.get('/findstock', function (req, res, next) {
    var userid = req.query.userid;
    var type = req.query.type;
    var code = req.query.code == null ? "" : req.query.code;

    if (type == 1 || type == 3) { //1全部  2是否收藏 3置顶某个元素
        var addSql = 'select * from stockcollect where userid=' + userid;
        var addSqlParArr = [userid];
    } else if (type == 2) {
        var addSql = 'select * from stockcollect where code=' + code + " and userid=" + userid;
        var addSqlParArr = [code, userid];
    }
    query(addSql, addSqlParArr, function (err, data, fields) {
        if (err) {
            var message = {
                "err": err,
                "code": 500
            }
            console.log(err);
            res.send(message);
        } else {
            if (type == 1) {
                if (data.length > 1) var arr = collect.setCollect(data);
                else var arr = data;
                var respData = {
                    "code": 200,
                    "collect": arr
                }
            } else if (type == 2) {
                if (data.length > 0) var respData = true;
                else var respData = false;
            } else if (type == 3) {
                if (data.length > 1) var arr = collect.stickArr(code, data);
                else var arr = data;
                var respData = {
                    "code": 200,
                    "collect": arr
                }
            }
            res.send(respData);
        }
    });
});

router.get('/deleteCollect', function (req, res, next) {
    var id = req.query.id;
    // 输出 JSON 格式
    var addSql = 'delete from stockcollect where  id=' + id;
    var addSqlParArr = [id];
    query(addSql, addSqlParArr, function (err, data, fields) {
        if (err) {
            var message = {
                "err": err,
                "code": 500
            }
            console.log(err);
            res.send(message);
        } else {
            console.log(data);
            var respData = {
                "code": 200,
                "state": "删除成功"
            }
            res.send(respData);
        }
    });
});

module.exports = router