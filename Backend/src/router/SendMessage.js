// SendMessage.js

const { notifyClient } = require('./WebSocket'); // 引入 WebSocket 通知模块
const generateUniqueId = require('../utils/generateUniqueId'); // 生成的唯一ID
const service = require('../utils/request');
const formatTime = require('../utils/formatTime');

// 定义发送消息的函数
function sendmessageFun(data) {
    const timestamp = Date.now() / 1000;
    const formatted1 = formatTime(timestamp, 'YYYY-MM-DD hh:mm:ss');
    let info = {
        id: generateUniqueId(),
        identity: data.identity,
        type: data.type,
        user: data.user,
        content: data.content,
        time: String(timestamp),
        create: formatted1
    };
    notifyClient(info);
    service.post('/historinfo', info)
        .then(response => {
            console.log('POST 请求结果:', response);
        })
        .catch(error => {
            console.error('POST 请求错误:', error);
        });
}

module.exports = sendmessageFun; // 导出函数
