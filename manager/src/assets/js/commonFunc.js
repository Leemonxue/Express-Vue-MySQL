const commonFunc = {
    getUserData: function (successFn, that) {
        let url = '/api/getTableData'
        let params = {
            "tablename": "User"
        }
        that.axios.post(url, params).then(function (res) {
            successFn(res)
        }).catch(function (err) {
            throw err
        })
    },
    getTableInfo: function (tablename, successFn, that) {
        let url = '/api/getTableInfo'
        let params = {
            "tablename": tablename
        }
        that.axios.post(url, params).then(function (res) {
            successFn(res)
        }).catch(function(err){
            throw err
        })
    }
}
module.exports = commonFunc