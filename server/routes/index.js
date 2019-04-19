var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var userDAO = require('../db/userDAO');
var jwtAuth = require('./jwt')
const {
    MD5_SUFFIX,
    md5,
    secretKey
} = require('../middle/constant');

router.use(jwtAuth)

router.post('/getToken', function (req, res) {
    userDAO.login(req.body.username, req.body.pass, function (result) {
        if (result) {
            if (result.length > 0) {
                res.json({
                    ret: '1',
                    message: 'login success',
                    username: req.body.username,
                    token: jwt.sign({
                        name: req.body.username,
                        data: "============="
                    }, secretKey, {
                        expiresIn: 60 * 60 * 1
                    })
                })
            } else {
                res.json({
                    ret: '0',
                    message: 'username or pass is wrong'
                })
            }
        } else {
            res.json({
                ret: '0',
                message: 'wrong'
            })
        }
    });
});
router.post('/getTableInfo', function(req, res, next){
    let tablename = req.body.tablename
    if(tablename){
        userDAO.getTableInfo(tablename, function (result) {
            if (result) {
                if (result.length > 0) {
                    res.json({
                        ret: '1',
                        message: 'success',
                        resData: result
                    })
                } else {
                    res.json({
                        ret: '0',
                        message: 'no table info'
                    })
                }
            } else {
                res.json({
                    ret: '0',
                    message: 'wrong'
                })
            }
        })
    }else{
        res.json({
            ret: '0',
            message: 'wrong'
        })
    }
})
router.post('/getTableData', function (req, res, next) {
    userDAO.getUserData(function (result) {
        if (result) {
            if (result.length > 0) {
                res.json({
                    ret: '1',
                    message: 'success',
                    resData: result
                })
            } else {
                res.json({
                    ret: '1',
                    message: 'no user data right now'
                })
            }
        } else {
            res.json({
                ret: '0',
                message: 'wrong'
            })
        }
    })
})
router.post('/deleteUser', function (req, res, next) {
    let uid = req.body.uid
    userDAO.deleteUser(uid, function (result) {
        if (result) {
            res.json({
                ret: '1',
                message: 'success',
            })
        } else {
            res.json({
                ret: '0',
                message: 'delete wrong'
            })
        }
    })
});
router.post('/insertUser', function (req, res, next) {
    let user = req.body
    userDAO.getUserByUsername(user.username, function (result) {
        if (result.length > 0) {
            res.json({
                ret: '0',
                message: 'the user has been exited.',
            })
        } else {
            userDAO.insertUser(user, function (result) {
                if (result) {
                    res.json({
                        ret: '1',
                        message: 'success',
                    })
                } else {
                    res.json({
                        ret: '0',
                        message: 'wrong'
                    })
                }
            })
        }
    })
});
router.post('/updateUser', function (req, res, next) {
    let user = req.body
    userDAO.getUserByUsername(user.username, function (result) {
        if (result.length > 0 && result[0].uid !== user.uid) {
            res.json({
                ret: '0',
                message: 'the username has been exited.',
            })
        }else {
            userDAO.updateUser(user, function (result) {
                if (result) {
                    res.json({
                        ret: '1',
                        message: 'success',
                    })
                } else {
                    res.json({
                        ret: '0',
                        message: 'wrong'
                    })
                }
            })
        }
    })
});
router.post('/searchUser', function (req, res, next) {
    let uid = req.body.uid
    if(uid == ''){
        userDAO.getUserData(function (result) {
            if (result) {
                if (result.length > 0) {
                    res.json({
                        ret: '1',
                        message: 'success',
                        resData: result
                    })
                } else {
                    res.json({
                        ret: '0',
                        message: 'no user'
                    })
                }
            } else {
                res.json({
                    ret: '0',
                    message: 'wrong'
                })
            }
        })
    }else{
        userDAO.getById(uid, function (result) {
            if (result) {
                if (JSON.stringify(result) !== '{}') {
                    res.json({
                        ret: '1',
                        message: 'success',
                        resData: result
                    })
                } else {
                    res.json({
                        ret: '1',
                        message: 'no this user'
                    })
                }
            } else {
                res.json({
                    ret: '0',
                    message: 'no this user'
                })
            }
        })
    }
});

module.exports = router;4