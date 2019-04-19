const expressJwt = require("express-jwt");
const {
    secretKey
} = require('../middle/constant');

const jwtAuth = expressJwt({
    secret: secretKey,
    credentialsRequired: true // 设置为false就不进行校验了，游客也可以访问
}).unless({
    path: ["/api/getToken"]
});

module.exports = jwtAuth;