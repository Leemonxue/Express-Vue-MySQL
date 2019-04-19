<template>
    <div id="footer-wapper">
        <ul id="footer-connection">
            <li class="footer-connection-item"><img src="@/assets/image/icon1.png" class="footer-icon"><a href="">地址：地址地址地址地址地址地址地址</a></li>
            <li class="footer-connection-item"><img src="@/assets/image/icon2.png" class="footer-icon">服务热线：12312341234</li>
            <li class="footer-connection-item"><img src="@/assets/image/icon3.png" class="footer-icon">投诉客服QQ：123123</li>
        </ul>
        <section id="footer-info">
            <p>copyright：测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</p>
            <p>试测试测试测试测试测试测试测试测试测试测试  2018-2019</p>
            <p>试测试测试测试测试测试测试测试测试测试测试测试</p>
        </section>
    </div>
</template>

<style>
a{
    color: #dbdbdb;
    cursor: pointer;
}
a:hover{
    color: #fff;
}
</style>
<style scoped>
#footer-wapper{
    width: 100%;
    height: 300px;
    border-top: 2px red solid;
    background-color: #1b252e;
    list-style: none;
    color: #dbdbdb;
}
#footer-connection{
    width: 800px;
    margin: 85px auto 30px;
    font-weight: 600;
    font-size: 14px;
    display: table;
}
.footer-connection-item{
    float: left;
    margin-left: 30px;
    display: table-cell;
}
.footer-icon{
    width: 30px;
    height: auto;
    vertical-align: middle;
    margin-right: 10px;
}
#footer-info{
    text-align: center;
    font-size: 16px;
    line-height: 30px;
}
</style>