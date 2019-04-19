var UserSQL = {
    queryUserData: 'SELECT * FROM User',
    deleteUser: 'delete from User where uid = ?',
    getUserById: 'SELECT * FROM User WHERE uid = ? ',
    getUserByUsername: 'SELECT * FROM User WHERE username = ? ',
    loginQuery: 'SELECT * FROM User WHERE (username = ? AND pass = ?)',
    querytTableInfo: 'select * from tbDesc where columnname in (select columnname from tbColumn where tablename = ?)',
    insertUser: 'INSERT INTO User (username,pass,email) VALUES (?,?,?)',
    updateUser: 'update User set username = ?, pass = ?, email = ? where uid = ?',
};
module.exports = UserSQL;