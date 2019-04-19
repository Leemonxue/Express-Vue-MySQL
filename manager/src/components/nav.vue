<template>
    <div id="nav-wrapper">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect">
            <el-submenu index="/main">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">管理操作</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/main/handle">操作</el-menu-item>
                    <el-menu-item index="/main/data">数据</el-menu-item>
                    <el-menu-item index="/main/document">文章</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/other">
                <i class="el-icon-menu"></i>
                <span slot="title">暂无</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data () {
        return {
            activeIndex: '',
        }
    },
    mounted() {
        this.activeIndex = this.$route.path
    },
    methods: {
        handleSelect(key, keyPath){
            this.$router.push(key)
        },
    },
}
</script>

<style scope>

</style>
