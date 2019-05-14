<template>
  <div id="main3-wrapper">
      <el-row :gutter="20">
            <el-col :span="6" id="article-input">
                <el-input
                    placeholder="请输入文章ID查询"
                    v-model.trim="article_id">
                </el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" icon="el-icon-search" @click="searchArticle()">搜索</el-button>
            </el-col>
            <el-col :span="2" :offset="12">
                <el-button type="primary" icon="el-icon-plus" @click="insertArticle()">新增文章</el-button>
            </el-col>
        </el-row>
        <el-table
        :data="articleData"
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
                    <el-button @click="detailArticle(scope.row)" type="text" size="small">详情</el-button>
                    <el-button @click="deleteArticle(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
        article_id: "",
        articleData: [],
        tableInfoData: [],
    }
  },
  methods: {
      searchArticle(){},
      insertArticle(){
          this.$router.push('/main/insertArticle')
      },
      detailArticle(row){},
      deleteArticle(row){},
  },
}
</script>

<style scoped>
#article-input{
    margin-bottom: 20px;
}
</style>
