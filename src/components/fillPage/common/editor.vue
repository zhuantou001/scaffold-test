<template id="textEditor">
  <div>
    <div class="quill-editor-example" v-loading="imageLoading" element-loading-text="请稍等，图片上传中">
      <!-- quill-editor -->
      <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" @change="onEditorChange($event)">
      </quill-editor>
      <form action="" method="post" enctype="multipart/form-data" id="uploadFormMulti">
        <input style="display: none" :id="uniqueId" type="file" name="file" accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImg('uploadFormMulti')">
        <!--style="display: none"-->
      </form>
    </div>
  </div>
</template>

<script>
import { Config, ROUTES } from '../../common/api';
var toolbarOptions = [['bold', 'italic'],
[{ 'size': ['small', false, 'large', 'huge'] }],
[{ 'color': [] }, { 'background': [] }],
[{ 'align': [] }],
['link', 'image']
];
export default {
  data() {
    return {
      content: this.aa,
      editorOption: {
        placeholder: '请输入内容',
        modules: {
          toolbar: toolbarOptions
        }
      },
      uniqueId: 'imgUpload',
      imageLoading: false
    };
  },
  props: ['aa'], // 直接使用会报错警告,所以用aa中转一下
  // if you need to manually control the data synchronization, parent component needs to explicitly emit an event instead of relying on implicit binding
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    onEditorBlur(editor) {
      // console.log('editor blur!', editor);
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor);
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor);
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text);
      this.content = html;
      this.$emit('textEditorContent_succ', this.content);
    },
    uploadImg: async function(id) {
      var vm = this;
      vm.imageLoading = true;
      const fileInput = document.getElementById(vm.uniqueId);
      const form = document.getElementById(id);
      if (fileInput.files.length == 0) {
        vm.imageLoading = false;
        return;
      }
      if (fileInput.files[0].size > 1024 * 1024 * 2) {
        vm.imageLoading = false;
        vm.$message.warning('图片不能大于2MB');
        return;
      }
      const url = Config.api_url + ROUTES.alertImgUpload;
      const data = new FormData(form);
      data.append(fileInput.fileName, fileInput.files[0]);
      this.$ajax({
        method: 'post',
        url: url,
        data: data
      }).then(function(res) {
        alert(res.data.alertImg)
        const value = Config.image_url + res.data.alertImg;
        vm.addImgRange = vm.$refs.myTextEditor.quill.getSelection();
        vm.$refs.myTextEditor.quill.insertEmbed(vm.addImgRange != null ? vm.addImgRange.index : 0, 'image', value, Quill.sources.USER)
        document.getElementById(vm.uniqueId).value = '';
        vm.imageLoading = false;
      }).catch(function(err) {
        document.getElementById(vm.uniqueId).value = '';
        vm.$message.warning(err);
        vm.imageLoading = false;
      });
    }
  },
  // if you need to get the current editor object, you can find the editor object like this, the $ref object is a ref attribute corresponding to the dom redefined
  // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    }
  },
  mounted() {
    // you can use current editor object to do something(editor methods)
    // console.log('this is my editor', this.editor);
    // this.editor to do something...
    var vm = this
    var imgHandler = async function(image) {
      // alert(22)
      vm.addImgRange = vm.$refs.myTextEditor.quill.getSelection()
      if (image) {
        var fileInput = document.getElementById(vm.uniqueId) //隐藏的file文本ID
        fileInput.click() //加一个触发事件
      }
    }
    vm.$refs.myTextEditor.quill.getModule("toolbar").addHandler("image", imgHandler)
  }
};

</script>

<style lang="scss">
.ql-container>.ql-editor {
  min-height: 10em;
  padding-bottom: 1em;
  max-height: 15em;
}

#toolbar {
  button,
  select {
    width: auto;
    border: 1px solid #eee;
    border-radius: 3px;
  }
  &>span {
    border: 1px solid #eee;
    border-radius: 3px;
  }
}
</style>
