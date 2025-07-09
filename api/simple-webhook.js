const line = require('@line/bot-sdk');

// Line Bot 配置
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new line.Client(config);

// Vercel Serverless Function
module.exports = async (req, res) => {
  console.log('=== 簡單Webhook被呼叫 ===');
  console.log('Method:', req.method);
  console.log('Body:', req.body);

  // 設定CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 處理OPTIONS請求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只處理POST請求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 檢查是否有events
    if (!req.body.events || req.body.events.length === 0) {
      console.log('沒有收到events');
      return res.status(200).json({ message: 'OK' });
    }

    // 處理每個事件
    for (const event of req.body.events) {
      console.log('處理事件:', event);
      
      if (event.type === 'message' && event.message.type === 'text') {
        const userMessage = event.message.text;
        console.log('用戶訊息:', userMessage);
        
        // 簡單回應
        let replyMessage = '';
        if (userMessage === '測試') {
          replyMessage = '✅ 測試成功！機器人正常運作！';
        } else if (userMessage === '幫助') {
          replyMessage = '🎉 歡迎使用信用卡推薦機器人！\n\n請輸入：\n• 旅遊\n• 現金回饋\n• 數位支付\n• 娛樂\n• 無年費';
        } else {
          replyMessage = `收到您的訊息：「${userMessage}」\n\n請輸入「幫助」查看功能說明。`;
        }
        
        // 發送回覆
        await client.replyMessage(event.replyToken, {
          type: 'text',
          text: replyMessage
        });
        
        console.log('已發送回覆:', replyMessage);
      }
    }
    
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('錯誤:', error);
    return res.status(500).json({ error: error.message });
  }
}; 