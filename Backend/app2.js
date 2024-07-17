const express = require('express');
const bodyParser = require('body-parser');
const wechat = require('wechat');
const WechatAPI = require('wechat-api');
const fs = require('fs');
const config = require('./config');

const app = express();
let api = null; // 初始化 api 实例对象为空

// 使用 body-parser 中间件解析请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const wechatConfig = {
  token: config.token,
  appid: config.appId,
  encodingAESKey: config.encodingAESKey
};

// 定义函数获取和刷新 access_token
const refreshAccessToken = (callback) => {
  if (!api) {
    api = new WechatAPI(config.appId, config.appSecret);
  }
  api.getLatestToken((err, token) => {
    if (err) {
      console.error('获取 access_token 失败:', err);
      callback(err);
    } else {
      console.log('成功获取并更新 access_token:', token);
      // 存储 access_token 和获取时间到文件
      const data = {
        access_token: token.accessToken,
        expires_in: token.expiresIn,
        timestamp: Date.now()
      };
      fs.writeFile('./access_token.json', JSON.stringify(data), (err) => {
        if (err) console.error('写入 access_token 文件失败:', err);
        console.log("写入 access_token 文件成功");
      });
      callback(null, token);
    }
  });
};

// 初始化从文件读取 access_token
const initializeAccessToken = (callback) => {
  fs.readFile('./access_token.json', 'utf8', (err, data) => {
    if (err) {
      console.error('读取 access_token 文件失败:', err);
    //   return refreshAccessToken(callback);
      return
    }
    console.log("读取 access_token 文件成功");
    const tokenData = JSON.parse(data);
    const now = Date.now();
    // 检查 token 是否过期
    if (now - tokenData.timestamp < tokenData.expires_in * 1000) {
      console.log('使用缓存的 access_token');
      callback(null, { accessToken: tokenData.access_token, expiresIn: tokenData.expires_in });
    } else {
      console.log('access_token 过期，重新获取');
    //   refreshAccessToken(callback);
        setTimeout(()=>{
            refreshAccessToken(callback)
        }, 5000);
    }
  });
};

// 错误处理函数：处理 API 调用配额上限的情况
const handleAccessTokenError = (err) => {
  console.error('获取 access_token 发生错误:', err);
  if (err.code === 45009) {
    console.error('API 调用配额已达上限，请等待配额重置后再尝试。');
  } else {
    // 其他错误处理逻辑，如记录日志、发送通知等
    console.error('未知错误:', err);
  }
};

// 初始化获取 access_token
initializeAccessToken((err, token) => {
  if (err) {
    handleAccessTokenError(err);
  } else {
    // 定时刷新 access_token，提前 200 秒刷新
    console.log("定时刷新 access_token，提前 200 秒刷新");
    // setInterval(() => {
    //   refreshAccessToken((err, token) => {
    //     if (err) {
    //       handleAccessTokenError(err);
    //     }
    //   });
    // }, (token.expiresIn - 200) * 1000);
  }
});

// 微信消息处理中间件
app.use('/wechat', (req, res, next) => {
  if (!api) {
    return res.status(500).send('服务暂不可用，请稍后重试');
  }
  req.weixinApi = api;
  next();
}, wechat(wechatConfig, (req, res, next) => {
  const message = req.weixin;
  const apiInstance = req.weixinApi;

  if (message.MsgType === 'event' && message.Event === 'subscribe') {
    // 用户关注事件
    console.log(`用户 ${message.FromUserName} 关注了公众号`);
    apiInstance.getUser(message.FromUserName, (err, result) => {
      if (err) {
        console.log('获取用户信息失败:', err);
        return res.reply(`欢迎使用斑马在线剪贴板呀！\n（回复“登录”自动登录）\n 获取信息失败！！`);
      }
      const userInfo = result;
      console.log('用户信息:', userInfo);
      res.reply(`欢迎使用斑马在线剪贴板呀！${userInfo.nickname}\n（回复“登录”自动登录）\n`);
      // 调用登录功能
      loginUser(userInfo);
    });
  } else if (message.MsgType === 'event' && message.Event === 'SCAN') {
    // 用户已关注后再次扫码事件
    console.log(`用户 ${message.FromUserName} 扫码登录`);
    res.reply('已登录');
  } else if (message.MsgType === 'text') {
    console.log(`用户 ${message.FromUserName}发送了：` + message.Content);
    if (message.Content === '登录') {
      // 调用登录功能
      apiInstance.getUser(message.FromUserName, (err, result) => {
        if (err) {
          console.log('获取用户信息失败:', err);
          return res.reply('获取用户信息失败');
        }
        const userInfo = result;
        console.log('用户信息:', userInfo);
        res.reply('登录成功');
        // 打印用户信息
        console.log('登录用户信息:', userInfo);
      });
    } else if (message.Content === '你好') {
      res.reply('欢迎使用斑马在线剪贴板');
    } else {
      res.reply('欢迎关注！');
    }
  } else {
    res.reply('欢迎关注！');
  }
}));

// 启动服务器监听指定端口
app.listen(config.port, () => {
  console.log(`服务器运行在 http://localhost:${config.port}`);
});
