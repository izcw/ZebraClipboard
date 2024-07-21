<template>
  <div class="content-box">
    <div class="copy-box" @click="copytext(textareaContent)">
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
    <Uploadfiles :liminumber="liminumber.toString()"></Uploadfiles>
    <el-affix position="bottom" :offset="0">
      <div class="SaveDelete">
        <div class="">
          <el-select v-model="FoxitEditor" style="width: 160px;z-index: 30;" placeholder="请选择编辑器" disabled>
            <el-option v-for="item in optionsEditor" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="buttonbox">
          <!-- <el-button type="info" plain>
            <el-icon>
              <DeleteFilled />
            </el-icon>&nbsp;删除
          </el-button>&nbsp; -->
          <!-- <el-button type="warning" plain disabled><el-icon>
              <Download />
            </el-icon>下载</el-button> -->
          <el-button type="primary" @click="saveData">保存</el-button>
          &nbsp;
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
import { ref, onBeforeUnmount, watch, inject, onMounted, defineProps, provide, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import axios from '../../../utils/axios';
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'



const limitationData = inject('limitationData');
const jiantebanData = inject('jiantebanData');

// 监听数据变化
if (jiantebanData) {
  watch(jiantebanData, (newValue, oldValue) => {
    // console.log('数据发生变化:', { newValue, oldValue });
    // 你可以在这里处理数据变化
    textareaContent.value = newValue.data[0].content
  });
}


// 文本框内容
let textareaContent = ref()
let liminumber = ref(0)

const emit = defineEmits(['update']);
watch(textareaContent, (newValue, oldValue) => {
  // console.log('textareaContent数据发生变化:', { newValue, oldValue });
  emit('update', false);
});
onMounted(()=>{
  setTimeout(()=>{
    emit('update', true);
  },500)
})

watch(textareaContent, (newVal) => {
  // console.log(countCharacters(newVal) + "/" + limitationData.value.NumberoFwords);
  liminumber.value = countCharacters(newVal)
  if (liminumber.value > limitationData.value.NumberoFwords) {
    textareaContent.value = textareaContent.value.slice(0, limitationData.value.NumberoFwords);
    ElMessage({
      message: '该套餐限制' + limitationData.value.NumberoFwords + '字.',
      type: 'warning',
    })
  }
});

// 检测字数
function countCharacters(str) {
  const matches = str.match(/./gu); // 使用正则表达式匹配所有字符，包括多字节字符
  return matches ? matches.length : 0;
}


const centerDialogVisible = inject('centerDialogVisible');

function toggleDialog() {
  centerDialogVisible.value = !centerDialogVisible.value;
}

let passwd = ref('')

// 保存
let saveData =async (passwd) => {
  // console.log(passwd.value);
  // console.log("保存");
  // 获取当前时间戳（秒）
  let cTime = Math.floor(Date.now() / 1000);
  // 获取 jiantebanData 的数据
  let data = jiantebanData.value;
  // 更新 content 和 changetime
  data.data[0].content = textareaContent.value;
  data.changetime = String(cTime);
  // 判断 passwd 是否有值，如果有则赋值给 data.password
  if (passwd.value) {
    data.passwd = passwd.value;
  }

  emit('update', true);
  // console.log(data);

  await axios.put('/clipboard/' + data.id, data);
};


// 初始化编辑器
let textContent = ref('<p>欢迎使用斑马在线剪贴板</p>')
const editor = useEditor({
  content: textContent.value,
  extensions: [
    StarterKit,
    Underline,
    Heading.configure({ levels: [1, 2, 3] }),
  ],
  onUpdate({ editor }) {
    // console.log("编辑了内容");
    // console.log("当前HTML内容：", editor.getHTML());
    // console.log("当前纯文本内容：", editor.getText());
    textContent.value = editor.getHTML()
  },
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
const FoxitEditor = ref("2")
const optionsEditor = [
  { value: '1', label: '富文本 和 Markdown' },
  { value: '2', label: '切换编辑器：纯文本' },
]

// 组件卸载时销毁编辑器实例
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})


// 定义要观察的对象
// let textareaContent = ref(limitation);

// // 使用 watch 来深度监听 message 的变化
// watch(() => limitation.value, (newValue) => {
//   console.log(newValue); // 输出当前内容
//   console.log("改变了"); // 输出改变信息 
// }, { deep: true }); // 启用深度监听

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



// 复制文本到剪贴板
const copystatus = ref(false)
const copytext = (text) => {
  // 创建一个临时 textarea
  const textarea = document.createElement('textarea')
  textarea.value = text
  document.body.appendChild(textarea)
  textarea.select()
  try {
    document.execCommand('copy')
    ElMessage({
      message: '复制成功',
      type: 'success',
    })
  } catch (err) {
    ElMessage({
      message: '复制失败',
      type: 'error',
    })
  }
  document.body.removeChild(textarea)

  // 切换复制状态
  copystatus.value = true
  setTimeout(() => {
    copystatus.value = false
  }, 500)
}
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
  top: 55px;
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
  width: 100% !important;
  min-height: 500px !important;
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