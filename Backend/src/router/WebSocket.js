const WebSocket = require('ws');

let wsClient = null;

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ port: 4011 });

wss.on('connection', (ws) => {
  console.log('WebSocket 客户端已连接');
  wsClient = ws;

  ws.on('close', () => {
    console.log('WebSocket 客户端已断开');
    wsClient = null;
  });
});

// 通知前端客户端的方法
const notifyClient = (message) => {
  if (wsClient) {
    wsClient.send(JSON.stringify(message));
  }
};

module.exports = {
  notifyClient
};
