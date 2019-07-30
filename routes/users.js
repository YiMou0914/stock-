var express = require('express');
var router = express.Router();

var query = require('../mysql/mysqlConnector');
var userBo = require('../public/javascripts/userInfoOB');

router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
/* post添加 */
router.get('/adduser', function (req, res, next) {
  // 输出 JSON 格式
  var name = req.query.name == null ? "" : req.query.name;
  var phone = req.query.phone == null ? "" : req.query.phone;
  var birthday = req.query.birthday == null ? "" : req.query.birthday;
  var wxid = req.query.wxid == null ? "" : req.query.wxid;
  var password = req.query.password == null ? "" : req.query.password;
  var nickname = req.query.nickname == null ? req.query.id : req.query.nickname;
  var headUrl = req.query.headUrl == null ? "" : req.query.headUrl;

  if(req.query.id==null){
    var id=userBo();
  }else{
    var id = req.query.id;
  }

  var addSql = 'insert into userinfo (id,name,birthday,phone,wxid,password,nickname,headUrl) VALUES(?,?,?,?,?,?,?,?)';
  var addSqlParArr = [id, name, birthday, phone, wxid, password, nickname, headUrl];
  query(addSql, addSqlParArr, function (err, rows, fields) {
    if (err) {
      // return res.json({
      //   data: "",
      //   code: 500,
      //   message: "数据添加失败！",
      //   success: false
      // });
      res.send('Hello World!!!!');
    } else {
      var respData = {
        "data": true,
        "code": 200,
        "message": Date.now(),
        "success": true,
        "name":name,
        "nickname":nickname,
        "headUrl":headUrl,
        "id":id,
      }
      res.send(respData);
    }
  });
});

router.get('/login', function (req, res, next) {
  // 输出 JSON 格式
  var id = req.query.id;
  if (req.query.password != null) var password = req.query.password;

  var addSql = 'select * from userinfo where id=' + id;
  var addSqlParArr = [id];
  query(addSql, addSqlParArr, function (err, data, fields) {
    if (err) {
      res.send(false);
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].password == password) {
          var userdata = {
            code: 200,
            state: false,
            userdata: data[i].id
          }
          res.send(userdata);
        } else {
          var data = {
            code: 401,
            state: false
          }
          res.send(data);
        }
      }
    }
  });
});


router.get('/getBirthInfo', function (req, res, next) {
  // 输出 JSON 格式
  var id = req.query.id;

  var addSql = 'select * from userinfo where id=' + id;
  var addSqlParArr = [id];
  query(addSql, addSqlParArr, function (err, data, fields) {
    if (err) {
      res.send(false);
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          var respData = {
            code: 200,
            state: false,
            time: data[i].birthday,
            name: data[i].name,
            lucknum: data[i].lucknum
          }
          res.send(respData);
          break;
        }
      }
    }
  });
});

router.get('/setbirth', function (req, res, next) {
  // 输出 JSON 格式
  var id = req.query.id;
  var birthday = req.query.birthday;
  var name = req.query.name;
  var lucknum = req.query.lucknum;

  var addSql = "update userinfo set birthday='" + birthday + "',lucknum=" + lucknum + ",name='" + name + "' where id=" + id;
  var addSqlParArr = [id, birthday, lucknum, name];
  query(addSql, addSqlParArr, function (err, data, fields) {
    if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

router.get('/getuserinfo', function (req, res, next) {
  // 输出 JSON 格式
  var id = req.query.id;

  var addSql = 'select * from userinfo where id=' + id;
  var addSqlParArr = [id];
  query(addSql, addSqlParArr, function (err, data, fields) {
    if (err) {
      var mesErr = {
        "state": 2,
        "code": 400,
        "err": err
      }
      res.send(mesErr);
    } else {
      if (data.length > 0) {
        var userData = {
          "state": 1,
          "code": 204,
          "err": "用户已存在"
        }
        res.send(userData);
      } else {
        var userData = {
          "state": 0,
          "code": 200
        }
        res.send(userData);
      }
    }
  });
});

router.get('/wechatlogin', function (req, res, next) {
  // 输出 JSON 格式
  var wxid = req.query.wxid;
  var avatarUrl = req.query.headUrl;
  var nickName = req.query.nickname;

  var addSql = "select * from userinfo where wxid='" + wxid+"'";
  var addSqlParArr = [wxid];
  query(addSql, addSqlParArr, function (err, data, fields) {
    if (err) {
      res.send(false);
    } else {
      if(data.length>0){
        var userData={
          id:data[0].id,
          nickname:data[0].nickname,
          head:data[0].headUrl,
          name:data[0].name,
          code:false
        }
        res.send(userData);
      }else{
        var userData={
          nickname:nickName,
          head:avatarUrl,
          wxid:wxid,
          code:true
        }
        res.send(userData);
      }
    }
  });
});
module.exports = router