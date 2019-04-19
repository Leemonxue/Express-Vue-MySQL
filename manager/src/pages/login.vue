<template>
    <div id="login-wrapper">
        <p id="login-title">登录</p>
        <el-form label-position="left" :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label-width="0">
                <el-button type="primary" @click="doLogin('loginForm')">登录</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>    
    </div>
</template>

<script>
export default {
    data () {
        return {
            loginForm: {
                username: '',
                pass: '',
            },
            rules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                
            }
        }
    },
    mounted() {
        if(this.$route.query.tag && this.$route.query.tag ==1){
            this.$message.warning('请先登录')
        }
    },
    methods: {
        doLogin(formName){
            let that = this
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        "username": that.loginForm.username,
                        "pass": that.loginForm.pass,
                    }
                    let url = '/api/getToken'
                    that.axios.post(url, params)
                    .then(function(res){
                        if(res.data.ret == '1'){
                            if(window.localStorage){
                                window.localStorage.setItem('token', res.data.token);
                                window.localStorage.setItem('username', params.username);
                            }
                            that.$message.success(res.data.message)
                            if(that.$route.query.redirect){
                                let redirect = that.$route.query.redirect;
                                that.$router.push(redirect);
                            }else{
                                that.$router.push('/main/handle');
                            }
                        }else{
                            that.$message.error(res.data.message)
                        }
                    })
                    .catch(function(err){
                        that.$message.error('登录失败')
                        console.log(err)
                    })
                } else {
                    return false
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
}
</script>

<style scoped>
#login-wrapper{
    width: 400px;
    padding: 30px 40px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #606266;
    border-radius: 20px;
    text-align: center;
}
#login-title{
    font-size: 28px;
    color: #a04050;
    margin-bottom: 30px;
    letter-spacing: 5px;
}
</style>
