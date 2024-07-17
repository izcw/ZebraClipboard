export async function generateEnhancedFingerprint() {
  try {
    // 检查并生成支持的特性
    const features = {};
    
    if (supportsCanvas()) {
      features.canvas = await generateCanvasFingerprint();
    }

    if (supportsUserAgent()) {
      features.userAgent = navigator.userAgent;
    }

    if (supportsScreenResolution()) {
      features.screenResolution = `${screen.width}x${screen.height}`;
    }

    if (supportsColorDepth()) {
      features.colorDepth = screen.colorDepth;
    }

    if (supportsTimezone()) {
      features.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    if (supportsLanguage()) {
      features.language = navigator.language;
    }

    if (supportsFonts()) {
      features.fonts = await detectFonts();
    }

    if (supportsHardwareConcurrency()) {
      features.hardwareConcurrency = navigator.hardwareConcurrency;
    }

    if (supportsDeviceMemory()) {
      features.deviceMemory = navigator.deviceMemory || 'unknown';
    }

    // 对指纹数据进行哈希处理，确保唯一性
    return hashData(JSON.stringify(features));
  } catch (error) {
    console.error('生成指纹时出错:', error);
    return 'error';
  }
}

// 检查是否支持 Canvas
function supportsCanvas() {
  return !!document.createElement('canvas').getContext;
}

// 生成 Canvas 指纹
async function generateCanvasFingerprint() {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('Hello, World!', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('Hello, World!', 4, 17);
    const dataUrl = canvas.toDataURL();
    return await hashData(dataUrl);
  } catch (error) {
    console.error('生成 Canvas 指纹时出错:', error);
    return 'error';
  }
}

// 检查是否支持用户代理
function supportsUserAgent() {
  return typeof navigator.userAgent === 'string';
}

// 检查是否支持屏幕分辨率
function supportsScreenResolution() {
  return typeof screen.width === 'number' && typeof screen.height === 'number';
}

// 检查是否支持颜色深度
function supportsColorDepth() {
  return typeof screen.colorDepth === 'number';
}

// 检查是否支持时区
function supportsTimezone() {
  return typeof Intl.DateTimeFormat === 'function';
}

// 检查是否支持语言
function supportsLanguage() {
  return typeof navigator.language === 'string';
}

// 检查是否支持字体检测
function supportsFonts() {
  return !!document.createElement('canvas').getContext;
}

// 检查是否支持硬件并发性
function supportsHardwareConcurrency() {
  return typeof navigator.hardwareConcurrency === 'number';
}

// 检查是否支持设备内存信息
function supportsDeviceMemory() {
  return typeof navigator.deviceMemory === 'number';
}

// 检测系统中安装的字体
async function detectFonts() {
  const testString = "abcdefghijklmnopqrstuvwxyz0123456789";
  const defaultWidth = {};
  const defaultHeight = {};
  const fonts = ['monospace', 'sans-serif', 'serif'];
  const fontList = ['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'];
  const detectedFonts = [];
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  fonts.forEach(function(font) {
    context.font = '72px ' + font;
    defaultWidth[font] = context.measureText(testString).width;
    defaultHeight[font] = context.measureText(testString).actualBoundingBoxAscent + context.measureText(testString).actualBoundingBoxDescent;
  });
  fontList.forEach(function(font) {
    const found = fonts.some(function(baseFont) {
      context.font = '72px ' + font + ',' + baseFont;
      const width = context.measureText(testString).width;
      const height = context.measureText(testString).actualBoundingBoxAscent + context.measureText(testString).actualBoundingBoxDescent;
      return width !== defaultWidth[baseFont] || height !== defaultHeight[baseFont];
    });
    if (found) detectedFonts.push(font);
  });
  return detectedFonts;
}

// 对数据进行 SHA-256 哈希处理
async function hashData(data) {
  try {
    if (!crypto.subtle || !crypto.subtle.digest) {
      throw new Error('crypto.subtle.digest 不受支持');
    }
    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    console.error('哈希数据时出错:', error);
    return 'error';
  }
}
