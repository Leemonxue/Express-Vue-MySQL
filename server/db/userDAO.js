// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);

module.exports = {
    login: function(username, pass, callback){
        pool.query(userSQL.loginQuery, [username, pass], function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },
    getById: function (id, callback) {
        pool.query(userSQL.getUserById, id, function (error, result) {
            if (error) throw error;
            callback(result[0]);
        });
    },
    getUserByUsername: function (username, callback) {
        pool.query(userSQL.getUserByUsername, username, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    getTableInfo: function (tablename, callback) {
        pool.query(userSQL.querytTableInfo, tablename, function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },
    getUserData: function (callback) {
        pool.query(userSQL.queryUserData, function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },
    deleteUser: function (uid, callback) {
        pool.query(userSQL.deleteUser, uid, function (error, result) {
            if (error) throw error;
            callback(result);
        })
    },
    insertUser: function (user, callback) {
        pool.query(userSQL.insertUser, [user.username, user.pass, user.email], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    updateUser: function (user, callback) {
        pool.query(userSQL.updateUser, [user.username, user.pass, user.email, user.uid], function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
};