<template>
  <div class="content-box">
    <div class="copy-box" @click="copytext">
      <img v-show="!copystatus" src="/images/icon/copy.png" alt="">
      <img v-show="copystatus" src="/images/icon/answer.png" alt="">
    </div>
    <div style="box-shadow: inset 0 0 2px #c5c5c5;">
      <!-- <div class="tools" style="border-bottom: 1px dashed rgb(204, 204, 204);">
        <el-select style="width: 65px" v-model="Headingsearch" :placeholder="Headingsearch">
          <el-option v-for="(item, index) in Headingarr" :key="index" :label="item.label" :value="item.value"
            @click="setHeading()" />
        </el-select>
        <el-button @click="toggleBold">加粗</el-button>
        <el-button @click="toggleUnderline">下划线</el-button>
      </div> -->
      <editor-content :editor="editor" v-show="FoxitEditor == 1" />
      <textarea v-show="FoxitEditor == '2'" ref="textareaRef" id="editor-textarea" name="editor-textarea" cols="80"
        rows="25" class="editor-textarea" v-model="textareaContent" @input="autoResize">
      </textarea>
    </div>
    <Uploadfiles></Uploadfiles>
    <el-affix position="bottom" :offset="0">
      <div class="SaveDelete">
        <div class="">
          <el-select v-model="FoxitEditor" style="width: 160px" placeholder="请选择编辑器">
            <el-option v-for="item in optionsEditor" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="buttonbox">
          <!-- <el-button type="info" plain>
            <el-icon>
              <DeleteFilled />
            </el-icon>&nbsp;删除
          </el-button>&nbsp; -->
          <el-button type="warning" plain><el-icon>
              <Download />
            </el-icon>下载</el-button>&nbsp;
          <el-button type="success" @click="toggleDialog()">
            <el-icon>
              <Promotion />
            </el-icon>&nbsp;分享
          </el-button>
        </div>
      </div>
    </el-affix>
  </div>
</template>
<script setup>
import { ref, onBeforeUnmount, inject, onMounted } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'

const centerDialogVisible = inject('centerDialogVisible');

function toggleDialog() {
  centerDialogVisible.value = !centerDialogVisible.value;
}

// 初始化编辑器
const editor = useEditor({
  content: '<p>欢迎使用Tiptap编辑器。</p>',
  extensions: [
    StarterKit,
    Underline,
    Heading.configure({ levels: [1, 2, 3] }),
  ],
})

// 定义切换粗体的函数
const toggleBold = () => {
  if (editor.value) {
    editor.value.chain().focus().toggleBold().run()
  }
}

// 定义切换下划线的函数
const toggleUnderline = () => {
  if (editor.value) {
    editor.value.chain().focus().toggleUnderline().run()
  }
}

// 定义设置标题的函数
const Headingarr = [
  { value: 1, label: "H1" },
  { value: 2, label: "H2" },
  { value: 3, label: "H3" }
]
let Headingsearch = ref(1)
const setHeading = () => {
  let level = Headingsearch.value;
  if (editor.value) {
    editor.value.chain().focus().toggleHeading({ level }).run()
  }
}

// 切换编辑器类型
const FoxitEditor = ref("1")
const optionsEditor = [
  { value: '1', label: '富文本 和 Markdown' },
  { value: '2', label: '纯文本' },
]

// 组件卸载时销毁编辑器实例
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

// 复制功能
let copystatus = ref(false)
let copytext = () => {
  copystatus.value = true
  setTimeout(() => {
    copystatus.value = false
  }, 500)
}

// 文本框内容
let textareaContent = ref("欢迎您！")

// 自动调整文本框高度
const autoResize = () => {
  const textarea = document.getElementById('editor-textarea')
  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + 'px'
}

// 初始化时自动调整高度
onMounted(() => {
  autoResize()
})
</script>


<style>
.el-button+.el-button {
  margin-left: 0 !important;
}

.content-box {
  border: 1px solid var(--vp-c-divider);
  z-index: 20;
}

.content-box:hover .copy-box {
  opacity: 1;
}



/*copy按钮*/
.copy-box {
  opacity: 0;
  transition: all ease 0.5s;
  position: absolute;
  right: 13px;
  top: 14px;
  width: 34px;
  height: 34px;
  padding: 6px;
  border: 1px solid #dadde1;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  z-index: 20;
  user-select: none;
}

.copy-box:hover {
  border: 1px solid #444;
}

@media (max-width: 992px) {
  .copy-box {
    opacity: 1;
  }
}

.copy-box img {
  width: 100%;
  height: 100%;
}

/*编辑器*/
.content-box .ProseMirror {
  outline: none;
  /*border-bottom: 1px dashed rgb(204, 204, 204);*/
  padding: 0.5rem 1rem;
  min-height: 800px !important;
}

.content-box .ProseMirror p {
  margin: 0;
  /* line-height: 10px !important;*/
}

.content-box .ProseMirror h1,
.content-box .ProseMirror h2,
.content-box .ProseMirror h3 {
  border-top: none !important;
  padding-top: 0 !important;
}

.content-box .ProseMirror h1 {
  margin-top: 45px !important;
}

.content-box .ProseMirror h2 {
  margin-top: 35px !important;
}

.content-box .ProseMirror h3 {
  margin-top: 25px !important;
}

.content-box .ProseMirror ul {
  margin-left: 1rem !important;
}

.content-box .ProseMirror ul li p {
  line-height: 15px !important;
}

/* 纯文本编辑器 */
.editor-textarea {
  overflow-y: hidden;
  resize: none;
  width: var(100% - 2px);
  min-height: 800px !important;
  background-color: var(--vp-c-bg);
  padding: 0.5rem 1rem;
  line-height: 28px;
  font-family: var(--vp-font-family-base);
  font-size: 16px;
}

/* 工具栏*/
.content-box .SaveDelete {
  border-top: 1px dashed rgba(0, 0, 0, .1);
  display: flex;
  justify-content: space-between;
  background-color: var(--vp-c-bg-custom) !important;
  background-color: #f5f5f5;
  padding: 8px 10px 10px 10px;
  z-index: 20 !important;
}

.el-affix--fixed {
  z-index: 20 !important;
}

.content-box .SaveDelete .item {
  margin-right: 10px;
}

@media (max-width: 992px) {

  .content-box .ProseMirror,
  .editor-textarea {
    min-height: 700px !important;
  }


  .content-box .SaveDelete {
    flex-direction: row;
  }

  .buttonbox {
    margin-bottom: 10px;
  }
}
</style>