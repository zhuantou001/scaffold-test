<template id="textEditor">
  <div>
      <div class="quill-editor-example">
        <!-- quill-editor -->
        <quill-editor v-model="content"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
          <div id="toolbar" slot="toolbar">
            <!-- Add a bold button -->
            <button class="ql-bold">Bold</button>
            <button class="ql-italic">Italic</button>
            <!-- Add font size dropdown -->
            <select class="ql-size">
              <option value="small"></option>
              <!-- Note a missing, thus falsy value, is used to reset to default -->
              <option selected></option>
              <option value="large"></option>
              <option value="huge"></option>
            </select>
            <!-- Add subscript and superscript buttons -->
            <button class="ql-script" value="sub"></button>
            <button class="ql-script" value="super"></button>
            <button @click="customButtonClick">custom button</button>
          </div>
        </quill-editor>
        <!--<div class="html ql-editor" v-html="content"></div>-->
      </div>
  </div>
</template>

<script>
  export default {
    name: 'textEditor',
    data () {
      return {
        content: '',
        editorOption: {
          // something config
          modules: {
            toolbar: '#toolbar'
          }
        }
      };
    },
    methods: {
      onEditorBlur (editor) {
        // console.log('editor blur!', editor)
      },
      onEditorFocus (editor) {
        // console.log('editor focus!', editor)
      },
      onEditorReady (editor) {
        // console.log('editor ready!', editor)
      },
      customButtonClick () {
        alert('可以定义一些自定义按钮做你想做的事，如上传图片至第三方存储...等等');
      }
    },
    mounted () {
      // you can use current editor object to do something(editor methods)
      console.log('this is my editor', this.editor);
      // this.editor to do something...
    },
    components: {
    }
  };

</script>

<style lang="scss">
  .ql-container>.ql-editor {
    min-height: 10em;
    padding-bottom: 1em;
    max-height: 15em;
  }
  #toolbar{
  button,select{
    width:auto;
    border:1px solid #eee;
    border-radius:3px;
  }
  &>span{
      border:1px solid #eee;
      border-radius:3px;
    }
  }
</style>
