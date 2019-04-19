<template>
    <div id="header-wrapper">
      <table id="header-nav">
        <tr>
          <td class="nav-item">
              首页
          </td>
          <td class="nav-item">
              服务体系<img src="@/assets/image/down_black.png" class="down">
          </td>
          <td class="nav-item">
              行业案例<img src="@/assets/image/down_black.png" class="down">
          </td>
          <td class="nav-item">
              商学院<img src="@/assets/image/down_black.png" class="down">
          </td>
          <td class="nav-item">
              关于我们
          </td>
          <td class="nav-item">
              免费诊断
          </td>
        </tr>
      </table>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    }
}
</script>

<style scoped>
#header-wrapper{
  width:1200px;
  margin: 0 auto;
}
#header-nav{
  width: 685px;
  float: right;
  font-size: 14px;
  table-layout: fixed;
}
.nav-item{
  padding: 15px 0;
  text-align: center;
  line-height: 20px;
}
.down{
  width: 20px;
  margin-left: 5px;
  vertical-align: top;
}
</style>
