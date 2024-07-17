const express = require('express');
const bodyParser = require('body-parser');
const wechat = require('wechat');
const config = require('./config');

const app = express();

// 使用 body-parser 中间件解析请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const wechatConfig = {
  token: config.token,
  appid: config.appId,
  encodingAESKey: config.encodingAESKey
};

// 微信消息处理中间件
app.use('/wechat', wechat(wechatConfig, (req, res, next) => {
  const message = req.weixin;

  if (message.MsgType === 'event' && message.Event === 'subscribe') {
    // 用户关注事件
    console.log(`用户 ${message.FromUserName} 关注了公众号`);
    res.reply('【斑马在线剪贴板】https://www.zebra.duoyu.link 欢迎关注！');
  } else if (message.MsgType === 'event' && message.Event === 'SCAN') {
    // 用户已关注后扫描二维码事件
    console.log(`用户 ${message.FromUserName} 扫描了带参数二维码，参数为：${message.EventKey}`);
    res.reply('欢迎扫描带参数二维码！');
    // 可以根据 message.EventKey 做进一步的逻辑处理
  } else if (message.MsgType === 'text') {
    // 文本消息处理
    console.log(`用户 ${message.FromUserName} 发送了文本消息：${message.Content}`);
    if (message.Content === '登录') {
      res.reply('登录成功');
      // 可以在这里处理登录成功后的其他逻辑
    } else if (message.Content === '你好') {
      res.reply('你好，欢迎使用！');
    } else {
      res.reply('请问有什么帮助！');
    }
  } else {
    // 其他消息类型，回复默认消息
    res.reply('欢迎使用！【斑马在线剪贴板】 https://www.zebra.duoyu.link/');
  }
}));


// 启动服务器监听指定端口
app.listen(config.port, () => {
  console.log(`服务器运行在 http://localhost:${config.port}`);
});
