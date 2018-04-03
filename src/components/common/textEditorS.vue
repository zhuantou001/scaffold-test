<template id="textEditor">
  <div>
      <div class="quill-editor-example">
        <!-- quill-editor -->
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)"
                      @change="onEditorChange($event)">
        </quill-editor>
      </div>
  </div>
</template>

<script>
var toolbarOptions = [
  ["bold", "italic", "underline"],
  [{ size: ["small", false, "large", "huge"] }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ["link"]
];
export default {
  data() {
    return {
      content: this.aa,
      editorOption: {
        placeholder: "请输入内容",
        modules: {
          toolbar: toolbarOptions
        }
      }
    };
  },
  props: ["aa",'textKey'],
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
       console.log('editor ready!', editor);
      console.log(this.aa);
    },
    onEditorChange({ editor, html, text }) {
//       console.log('editor change!', editor, html, text);
//      console.log(editor);
//      console.log(html);
//      console.log(text);
//      console.log(this.textKey);
      this.content = html;
      this.$emit("textEditorContent", this.content, this.textKey);
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
    //      console.log('this is my editor', this.editor);
    // this.editor to do something...
    // this.editor.focus();
    console.log("focus", this.editor.hasFocus());
    if (this.editor.hasFocus()) {
      this.editor.blur();
    }
    const doms = document.getElementsByClassName("assembly");
    for (let i = 0; i < doms.length; i++) {
      doms[i].scrollTop = 0;
    }
  }
};
</script>

<style lang="scss">
.ql-container > .ql-editor {
  min-height: 6em !important;
  padding-bottom: 1em;
  max-height: 10em !important;
}
#toolbar {
  button,
  select {
    width: auto;
    border: 1px solid #eee;
    border-radius: 3px;
  }
  & > span {
    border: 1px solid #eee;
    border-radius: 3px;
  }
}
</style>
