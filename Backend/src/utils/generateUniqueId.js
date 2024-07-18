// 生成的唯一I
const { v4: uuidv4 } = require('uuid');

function generateUniqueId() {
  return uuidv4(); // 生成符合标准的 UUID
}

module.exports = generateUniqueId;