<template>
  <div id="header-wrapper">
        <p id="header-title">Manager System</p>
        <div id="header-right">
            <span>{{username}}</span>
            <el-dropdown>
                <i class="el-icon-setting icon"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native.stop="logout()">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            username: 'TEST',
        }
    },
    methods: {
        logout(){
            let that = this
            that.$confirm('你确定要退出吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                window.localStorage.clear();
                that.$router.push({
                    path: '/login'
                })
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: 'wrong'
                });
            });
        },
    },
}
</script>

<style scoped>
#header-wrapper{
    height: 60px;
    line-height: 60px;
    color: #fff;
}
#header-title{
    font-size: 28px;
    display: inline-block;
    margin-left: 20px;
}
#header-right{
    font-size: 16px;
    float: right;
    margin-right: 30px;
    vertical-align: middle;
}
.icon{
    margin-left: 15px; 
    font-size: 20px;
    cursor: pointer;
    color: #fff;
}
</style>
