<template>
    <el-container id="layout-wrapper">
        <el-header id="header">
            <Header></Header>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <Nav></Nav>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Header from "@/components/header";
import Nav from "@/components/nav";
export default {
  components: { Header, Nav },
  name: "App"
};
</script>

<style scope>
#header{
    background: #a04050;
}
</style>
