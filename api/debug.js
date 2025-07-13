module.exports = async (req, res) => {
  // 設定CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 處理OPTIONS請求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log('=== DEBUG 端點被調用 ===');
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('========================');

  // 檢查環境變數
  const envCheck = {
    LINE_CHANNEL_ACCESS_TOKEN: process.env.LINE_CHANNEL_ACCESS_TOKEN ? '已設定' : '未設定',
    LINE_CHANNEL_SECRET: process.env.LINE_CHANNEL_SECRET ? '已設定' : '未設定',
    NODE_ENV: process.env.NODE_ENV || '未設定',
    PORT: process.env.PORT || '未設定'
  };

  // 檢查Token格式
  const tokenInfo = {
    hasToken: !!process.env.LINE_CHANNEL_ACCESS_TOKEN,
    tokenLength: process.env.LINE_CHANNEL_ACCESS_TOKEN ? process.env.LINE_CHANNEL_ACCESS_TOKEN.length : 0,
    tokenPrefix: process.env.LINE_CHANNEL_ACCESS_TOKEN ? process.env.LINE_CHANNEL_ACCESS_TOKEN.substring(0, 10) + '...' : '無'
  };

  const debugInfo = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    headers: req.headers,
    environment: envCheck,
    tokenInfo: tokenInfo,
    message: '調試資訊 - 請檢查環境變數是否正確設定'
  };

  console.log('調試資訊:', debugInfo);

  return res.status(200).json(debugInfo);
}; 