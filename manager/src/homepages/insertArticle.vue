<template>
  <div id="insert-article-wrapper">
    <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/main/document' }">文章</el-breadcrumb-item>
        <el-breadcrumb-item>新增文章</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="toolbar-container"></div>
    <div id="editor">
        <p>This is the initial editor content.</p>
    </div>
    <el-button type="primary" icon="el-icon-plus" @click="doInsert()" id="insert-btn">新增</el-button>
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn'
export default {
    data() {
        return {
        editor: null,//编辑器实例
        }
  },
  mounted() {
     this.initCKEditor()
  },
   methods: {
      initCKEditor() {
        CKEditor.create(document.querySelector('#editor'), {
            removePlugins: ['MediaEmbed'],  //除去视频按钮
            language: 'zh-cn',  // 中文
            ckfinder: {
                'uploaded': 1,
                'uploadUrl': '/admin/Upload/uploadUrl'
                //后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
            }
        }).then(editor => {
          const toolbarContainer = document.querySelector('#toolbar-container');
          toolbarContainer.appendChild(editor.ui.view.toolbar.element);
          this.editor = editor //将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
        }).catch(error => {
          console.error(error);
        });
     },
     doInsert(){
         let test = this.editor.getData()
         console.log(test)
     },
  }
}
</script>
<style scoped>
#toolbar-container{
    margin-top: 10px;
}
#editor{
    border: 1px rgb(196, 196, 196) solid;
    border-top: none;
    height: 80%;
    min-height: 500px;
}
#insert-btn{
    margin-top: 10px;
    float: right;
}
</style>

