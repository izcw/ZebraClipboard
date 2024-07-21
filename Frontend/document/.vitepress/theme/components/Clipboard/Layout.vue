<template>
    <div>
        <div class="box">
            <!-- <div class="nd-box" @click="ndFolditup()">
                <img v-show="!ndstatus" src="/images/icon/nd-left.png" alt="">
                <img v-show="ndstatus" src="/images/icon/nd-right.png" alt="">
            </div> -->
            <!-- 折叠工具栏 -->

            <div class="left">
                <div style="padding-bottom: 1rem;  display: flex;justify-content: space-between;align-items: center;">
                    <div>
                        <!-- <el-button plain @click="addTab(editableTabsValue)" size="large"
                            style="background-color:var(--vp-c-bg-custom);color:var(--vp-c-text-1);border: 1px solid var(--vp-c-divider);">
                            <el-icon>
                                <DocumentAdd />
                            </el-icon>&ensp;新建文本文档
                        </el-button>&emsp; -->
                        <el-text v-if="statussave" type="success" size="small">已于 {{ formatTimechangetime }}
                            保存成功</el-text>
                        <el-text v-else type="warning" size="small">未保存</el-text>

                    </div>
                    <!-- <el-text v-show="!ndstatus" class="mx-1 expire" style="color: var(--vp-c-text-1);"
                        @click="centerDialogVisible = true" size="small">
                        <span>3</span>天后过期</el-text> -->
                </div>
                <!-- <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="tabremove()" class="demo-tabs"
                    @edit="handleTabsEdit">
                    <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
                    </el-tab-pane>
                </el-tabs> -->
                <Editor :jiantebanData="jiantebanData" @update="handleUpdate" />
            </div>

            <!-- <div class="right" v-show="ndstatus">
                <QRcode></QRcode>
                <information></information>
            </div> -->
            <!-- 工具栏 -->

            <el-dialog v-model="centerDialogVisible" title="分享" align-center>
                <sidebarIndex></sidebarIndex>
            </el-dialog><!-- 分享模态框 -->
        </div>
        <FooterInfo></FooterInfo>
    </div>

</template>

<script setup>
import { ref, provide, markRaw, watch, computed } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import axios from '../../../utils/axios';
import { formatTime } from '../../../utils/formatTime.js'

// 处理从子组件传递的数据,保存状态
let statussave = ref(true)
const handleUpdate = (data) => {
    statussave.value = data;
}


// 获取用户数据
let dataUser = ref({
    id: "",
    wechat: {
        user: ""
    },
    Browserid: {
        user: ""
    },
    VerifiCode: "",
    VerifiCodeTime: "",
    create: "",
    limitationID: "1"
})
setTimeout(() => {
    dataUser.id = "9999"
}, 5000)

// 使用 provide 将 dataUser 提供给所有子组件
provide('dataUser', dataUser)



let clipboardData = ref({
    id: "",
    userName: "",
    data: [
        {
            name: "",
            content: "",
            editorType: "",
            passwd: ""
        }
    ],
    create: "",
    updatetime: "",
})

// 获取对应的用户
const getDataUser = async () => {
    const response = await axios.get('/user');
    let fingeMark = ''
    if (typeof window !== 'undefined') {
         fingeMark = localStorage.getItem('fingeMark')
    }
    dataUser.value = response.data.find(item => item.Browserid.user === fingeMark);
    getQuery(dataUser.value.id)


    const responseClipboard = await axios.get('/clipboard');

    // 如果没找到该用户的剪贴板就新建一个
    let findClipboard = responseClipboard.data.find(item => item.id == dataUser.value.id);
    // console.log("剪贴板");
    // console.log(findClipboard);
    let cTime = Math.floor(Date.now() / 1000);
    let dataarr = {
        id: dataUser.value.id,
        data: [
            {
                name: "文件一",
                content: "欢迎使用斑马在线剪贴板..",
                editorType: "text"
            }
        ],
        passwd: "",
        changetime: String(cTime),
        create: String(cTime)
    }
    if (findClipboard == undefined) {
        await axios.post('/clipboard', dataarr);
    }
}
getDataUser()

// 获取套餐数据
let limitationData = ref();
const getDataLimitation = async () => {
    const response = await axios.get('/limitation');
    limitationData.value = response.data.filter(item => item.typeID == dataUser.value.limitationID)[0]
}
getDataLimitation()
provide('limitationData', limitationData) // 使用 provide 将 dataUser 提供给所有子组件

let formatTimechangetime = ref()
// 获取剪贴板数据
const jiantebanData = ref();
const getQuery = async (id) => {
    // console.log("??");
    // console.log(id);
    const responseClipboard = await axios.get('/clipboard/' + id);
    jiantebanData.value = responseClipboard.data;
    // console.log("dazui");
    // console.log(jiantebanData.value);
    formatTimechangetime.value = formatTime(jiantebanData.value.changetime, 'YYYY年MM月DD日 hh时mm分ss秒')
};
provide('jiantebanData', jiantebanData);


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
// 删除标签页
const tabremove = async (targetName) => {
    try {
        await ElMessageBox.confirm(
            '确定删除吗？',
            {
                type: 'warning',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                icon: markRaw(Delete),
            }
        )
        // 确认删除后的操作
        const tabs = editableTabs.value
        const activeName = editableTabsValue.value
        editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
        if (activeName === targetName) {
            const nextTab = editableTabs.value.find(tab => tab.name !== targetName)
            editableTabsValue.value = nextTab ? nextTab.name : ''
        }
    } catch (error) {
        // 用户取消了删除操作，不做任何事情
    }
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
    // console.log("dianji");
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
    top: 66px;
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