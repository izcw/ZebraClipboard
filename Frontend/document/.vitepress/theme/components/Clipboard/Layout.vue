<template>
    <div>
        <div class="box">
            <div class="nd-box" @click="ndFolditup()">
                <img v-show="!ndstatus" src="/images/icon/nd-left.png" alt="">
                <img v-show="ndstatus" src="/images/icon/nd-right.png" alt="">
            </div><!-- 折叠工具栏 -->

            <div class="left">
                <div style="padding-bottom: 1rem;  display: flex;justify-content: space-between;align-items: center;">
                    <div>
                        <!-- <p>id{{fingerprint}}</p> -->
                        <!-- {{ data }} -->
                        用户唯一： {{ accountnumber.Browserid.user }}
                        <hr>
                        {{ counter }}
                        <p @click="increment">点击{{ counter }}</p>
                        <el-button plain @click="addTab(editableTabsValue)" size="large"
                            style="background-color:var(--vp-c-bg-custom);color:var(--vp-c-text-1);border: 1px solid var(--vp-c-divider);">
                            <el-icon>
                                <DocumentAdd />
                            </el-icon>&ensp;新建文本文档
                        </el-button>&emsp;
                        <el-text v-if="true" type="success" size="small">已于 02:57:33
                            保存成功</el-text>
                        <el-text v-else type="warning" size="small">网络中断 本地存储中</el-text>
                    </div>
                    <el-text v-show="!ndstatus" class="mx-1 expire" style="color: var(--vp-c-text-1);"
                        @click="centerDialogVisible = true" size="small">
                        <span>3</span>天后过期</el-text>
                </div>
                <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="tabremove()" class="demo-tabs"
                    @edit="handleTabsEdit">
                    <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
                        <Editor />
                    </el-tab-pane>
                </el-tabs>
            </div>

            <div class="right" v-show="ndstatus">
                <QRcode></QRcode>
                <information></information>
            </div><!-- 工具栏 -->

            <el-dialog v-model="centerDialogVisible" title="分享" align-center>
                <sidebarIndex></sidebarIndex>
            </el-dialog><!-- 分享模态框 -->
        </div>
        <FooterInfo></FooterInfo>
    </div>

</template>

<script setup>
import { ref, provide, markRaw, watch } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'

// pinia
import { storeToRefs } from 'pinia';
import { monitorstorage } from '../../hooks/monitorLocalstorage.js';
import { piniaUser } from '../../../store/user.js';
const store = piniaUser();
monitorstorage(store);
const { counter, data, accountnumber } = storeToRefs(store);

const increment = () => {
    store.increment();
};



// 分享模态框
const centerDialogVisible = ref(false);
provide('centerDialogVisible', centerDialogVisible);

// 标签页
let tabIndex = 2
const editableTabsValue = ref('1')
const editableTabs = ref([
    {
        title: '文本文档 1',
        name: '1'
    },
    {
        title: '文本文档 2',
        name: '2'
    },
])
const addTab = (targetName) => {
    if (editableTabs.value.length >= 2) {
        ElMessage({
            message: '游客最多新建两个文档，登录后享更大空间！',
            type: 'warning',
        })
        return
    }
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
        title: '文本文档 ' + (Number(editableTabs.value.length) + 1),
        name: newTabName
    })
    editableTabsValue.value = newTabName
}
const tabremove = (el) => {
    console.log("删除" + el);
    ElMessageBox.confirm(
        '确定删除吗？',
        {
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            icon: markRaw(Delete),
        }
    )
}

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


// 工具栏折叠
let ndstatus = ref(false)
let ndFolditup = () => {
    console.log("dianji");
    ndstatus.value = !ndstatus.value
}
</script>

<style scoped>
.commonblock {
    padding-bottom: 30px;
    margin-bottom: 30px;
}

.box {
    display: flex;
    align-items: flex-start;
    margin: 10px 0 60px 0;
    position: relative;
}

.left {
    width: 100%;
    position: relative;
}

.right {
    width: 270px;
    max-width: 270px;
    height: auto;
    padding: 30px 15px;
    padding-top: 80px;
    margin-left: 15px;
    box-sizing: border-box;
    transition: all ease 0.2s;
}


@media (max-width: 992px) {
    .box {
        flex-direction: column;
    }

    .left {
        width: 100%;
    }

    .right {
        width: 100%;
        margin-left: 0;
        /* margin-top: 60px;
       box-shadow: 0px 0px 6px 0 rgba(0, 0, 0, .1);*/
        flex-direction: column !important;
    }

}

.editor {
    box-shadow: 0px 0px 6px 0 rgba(0, 0, 0, .1);
    margin-bottom: 60px;
}

/*折叠按钮*/
.nd-box {
    position: absolute;
    right: 0;
    top: 54px;
    width: 30px;
    height: 30px;
    padding: 6px;
    cursor: pointer;
    z-index: 20;
    user-select: none;

    transition: all ease 0.5s;
    opacity: 0.8;
}

.nd-box:hover {
    opacity: 1;
}

.nd-box img {
    width: 100%;
    height: 100%;
}

@media (max-width: 992px) {
    .nd-box {
        display: none;
    }

    .right {
        display: none;
    }
}
</style>