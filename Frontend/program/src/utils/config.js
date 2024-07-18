/**
 * @file config.js
 * @author 张成威 2331020120242
 * @description 配置信息
 */
// 4010 端口是wechat微信公众号回复的接口
// 4011 端口是消息接口WebSocket
// 4012 端口是json-serve



const config = {
    // 服务器基本地址
    // urlport4010: 'https://www.apizebra.duoyu.link',
    // urlport4011: 'ws://www.comm.duoyu.link',
    // urlport4012: 'https://apizebra.duoyu.link',

    // 本地基本地址
    urlport4010: 'http://127.0.0.1:4010',
    urlport4011: 'ws://127.0.0.1:4011',
    urlport4012: 'http://127.0.0.1:4012',
};

export default config;

