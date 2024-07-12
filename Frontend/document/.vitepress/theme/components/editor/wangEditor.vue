<template>
  <div>
    <div class="content-box">
      <Toolbar class="wangEdtitor-Toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor class="wangEdtitor-Editor" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
        @onCreated="handleCreated" />
      <Uploadfiles></Uploadfiles>
      <el-affix position="bottom" :offset="0">
        <div class="SaveDelete">
          <div>
            <el-badge class="item" style="margin-top:10px;" type="warning" value="" :offset="[10, 5]">
              <el-text>字数：<span
                  style="font-size: 12px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);border-radius: 6px;padding: 4px;box-sizing: border-box;">34
                  / 1000</span> </el-text>
            </el-badge>
            <el-badge class="item" style="margin-top:10px;" type="warning" value="登录后享更大空间" :offset="[10, 5]">
              <el-text>空间：<span
                  style="font-size: 12px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);border-radius: 6px;padding: 4px;box-sizing: border-box;">0.5M
                  / 5M</span> </el-text>
            </el-badge>
          </div>
          <div>
            <el-select v-model="FoxitEditor" style="width: 140px" placeholder="请选择编辑器">
              <el-option v-for="item in optionsEditor" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div>
            <el-button type="info">
              <el-icon>
                <DeleteFilled />
              </el-icon>删除
            </el-button>
            <el-button type="success">
              <el-icon>
                <Promotion />
              </el-icon>保存
            </el-button>
          </div>
        </div>
      </el-affix>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>'
  }, 1500)
})

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

// 定义 mode 变量
const mode = 'default' // 或 'simple'


// 切换编译器
let FoxitEditor = ref("1")
const optionsEditor = [
  {
    value: '1',
    label: '富文本',
  },
  {
    value: '2',
    label: 'Markdown',
  },
  {
    value: '3',
    label: '纯文本',
  },
]
</script>

<style scoped>
.content-box {
  border: 1px solid rgb(230, 230, 230);
  z-index: 999;
}

.wangEdtitor-Toolbar {
  border-bottom: 1px dashed rgb(204, 204, 204);
}

.wangEdtitor-Editor {
  min-height: 560px !important;
  cursor: text;
}

.SaveDelete {
  border-top: 1px dashed rgba(0, 0, 0, .1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--vp-c-bg-custom);
  padding: 10px;
  padding-top: 15px;
  margin-bottom: 15px;
}

.SaveDelete .item {
  margin-right: 10px;
}
</style>