<template>
    <div id="main1-wrapper">
        <el-row :gutter="20">
            <el-col :span="6" id="user-input">
                <el-input
                    placeholder="请输入用户ID查询"
                    v-model.trim="uid">
                </el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" icon="el-icon-search" @click="searchUser()">搜索</el-button>
            </el-col>
            <el-col :span="2" :offset="12">
                <el-button type="primary" icon="el-icon-plus" @click="insertUser()">增加用户</el-button>
            </el-col>
        </el-row>
        <el-table
        :data="userData"
        border
        style="width: 100%">
            <el-table-column
            v-for="item in tableInfoData"
            :key = "item.id"
            :prop="item.columnname"
            :label="item.cn"
            min-width="5">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            min-width="10">
                <template slot-scope="scope">
                    <el-button @click="updateUser(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
        title="修改用户信息"
        :visible.sync="updateUserVisible"
        width="40%">
            <el-form label-position="right" label-width="80px" :model="updateUserData" :rules="userRules" ref="updateUserForm">
                <el-form-item label="用户ID：">
                    {{updateUserData.uid}}
                </el-form-item>
                <el-form-item label="用户名" required prop="username">
                    <el-input v-model.trim="updateUserData.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" required prop="pass">
                    <el-input v-model.trim="updateUserData.pass"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" required prop="email">
                    <el-input v-model.trim="updateUserData.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="doUpdateUser('updateUserForm')">修 改</el-button>
            </span>
        </el-dialog>
        <el-dialog
        title="新增用户"
        :visible.sync="insertUserVisible"
        width="40%">
            <el-form label-position="right" label-width="80px" :model="insertUserData" :rules="userRules" ref="insertUserForm">
                <el-form-item label="用户名" required prop="username">
                    <el-input v-model.trim="insertUserData.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" required prop="pass">
                    <el-input v-model.trim="insertUserData.pass"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" required prop="email">
                    <el-input v-model.trim="insertUserData.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetInsertUserForm('insertUserForm')">重 置</el-button>
                <el-button type="primary" @click="doInsertUser('insertUserForm')">新 增</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        let that = this
        const successFnData = function(res){
            if(res.data.ret == '1'){
                that.userData = res.data.resData
            }else{
                that.$message.error('请求数据失败')
            }
        }
        const successFnInfo = function(res){
            if(res.data.ret == '1'){
                that.tableInfoData = res.data.resData
            }else{
                that.$message.error('请求数据失败')
            }
        }
        return {
            successFnData,
            successFnInfo,
            userData: [],
            tableInfoData: [],
            uid: null,
            insertUserVisible: false,
            updateUserVisible: false,
            insertUserData: {},
            updateUserData: {
                "username": "",
                "pass": "",
                "email": "",
            },
            userRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
                ],
            }
        }
    },
    mounted() {
        this.commonFunc.getUserData(this.successFnData, this)
        this.commonFunc.getTableInfo('User', this.successFnInfo, this)
    },
    methods: {
        updateUser(row){
            this.updateUserData.uid = row.uid
            this.updateUserData.username = row.username
            this.updateUserData.pass = row.pass
            this.updateUserData.email = row.email
            this.updateUserVisible = true
        },
        doUpdateUser(formName){
            let that = this
            that.$refs[formName].validate((valid) => {
            if (valid) {
                let that = this
                let url = '/api/updateUser'
                let params = that.updateUserData
                that.axios.post(url, params).then(function(res){
                    if(res.data.ret == '1'){
                        that.$message({
                            type: 'success',
                            message: '修改成功'
                        }); 
                        that.commonFunc.getUserData(that.successFnData, that)
                        that.updateUserVisible = false
                    }else{
                        that.$message({
                            type: 'error',
                            message: res.data.message
                        }); 
                    }
                }).catch(function(err){
                    console.log(err)
                })
            } else {
                that.$message.waring('请输入正确数据')
                return false;
            }
            });
        },
        deleteUser(row){
            let that = this
            that.$confirm('确认删除该数据吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.doDeleteUser(row)
            }).catch(() => {
                that.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        doDeleteUser(row){
            let that = this
            let url = '/api/deleteUser'
            let params = {
                "uid": row.uid
            }
            that.axios.post(url, params).then(function(res){
                if(res.data.ret == '1'){
                    that.$message({
                        type: 'success',
                        message: '删除成功'
                    }); 
                    that.commonFunc.getUserData(that.successFnData, that)
                }else{
                    that.$message({
                        type: 'error',
                        message: res.data.message
                    }); 
                }
            }).catch(function(err){
                that.$message({
                    type: 'error',
                    message: err?err:'删除失败'
                }); 
            })
        },
        searchUser(){
            let that = this
            let url = '/api/searchUser'
            let params = {
                "uid": that.uid
            }
            that.axios.post(url, params).then(function(res){
                if(res.data.ret == '1'){
                    if(res.data.resData instanceof Array){
                        that.userData = res.data.resData
                    }else{
                        let arr = []
                        arr.push(res.data.resData)
                        that.userData = arr
                    }
                }else{
                    that.$message({
                        type: 'error',
                        message: res.data.message
                    }); 
                }
            }).catch(function(err){
                console.log(err)
            })
        },
        insertUser(){
            this.insertUserVisible = true
        },
        doInsertUser(formName) {
            let that = this
            that.$refs[formName].validate((valid) => {
            if (valid) {
                let that = this
                let url = '/api/insertUser'
                let params = that.insertUserData
                that.axios.post(url, params).then(function(res){
                    if(res.data.ret == '1'){
                        that.$message({
                            type: 'success',
                            message: '新增成功'
                        }); 
                        that.commonFunc.getUserData(that.successFnData, that)
                        that.insertUserVisible = false
                    }else{
                        that.$message({
                            type: 'error',
                            message: res.data.message
                        }); 
                    }
                }).catch(function(err){
                    console.log(err)
                })
            } else {
                that.$message.waring('请输入正确数据')
                return false;
            }
            });
        },
        resetInsertUserForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
}
</script>

<style scoped>
#user-input{
    margin-bottom: 20px;
}
</style>
