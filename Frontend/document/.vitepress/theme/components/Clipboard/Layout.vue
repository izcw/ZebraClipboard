<template>
    <div class="box">
        <div class="left">
            <operation></operation>
            <QRcode></QRcode>
            <information></information>
            <el-text class="mx-1" type="danger"><el-icon>
                    <WarnTriangleFilled />
                </el-icon>非法内容举报（请不要上传敏感信息！）</el-text>
        </div>
        <div class="right">
            <el-tabs v-model="editableTabsValue" type="card" class="demo-tabs" @edit="handleTabsEdit">
                <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
                    <wangEditor />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

let tabIndex = 2
const editableTabsValue = ref('2')
const editableTabs = ref([
    {
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content',
    },
    {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content',
    },
])

const handleTabsEdit = (
    targetName,
    action
) => {
    if (action === 'add') {
        const newTabName = `${++tabIndex}`
        editableTabs.value.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content',
        })
        editableTabsValue.value = newTabName
    } else if (action === 'remove') {
        const tabs = editableTabs.value
        let activeName = editableTabsValue.value
        if (activeName === targetName) {
            tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        activeName = nextTab.name
                    }
                }
            })
        }

        editableTabsValue.value = activeName
        editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
    }
}
</script>

<style scoped>
.commonblock {
    border-bottom: 1px dashed rgba(0, 0, 0, .1);
    padding-bottom: 30px;
    margin-bottom: 30px;
}

.box {
    display: flex;
    align-items: flex-start;
    margin: 60px 0;
}

.left {
    width: 240px;
    min-width: 240px;
    height: auto;
    margin-right: 15px;
    padding: 30px 15px;
    box-sizing: border-box;
    box-shadow: 0px 0px 6px 0 rgba(0, 0, 0, .1);
    background-color: var(--vp-c-bg-custom);
}

.right {
    background-color: var(--vp-c-bg-custom);
}

.editor {
    box-shadow: 0px 0px 6px 0 rgba(0, 0, 0, .1);
    margin-bottom: 60px;
}
</style>