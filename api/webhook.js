const line = require('@line/bot-sdk');
const CardRecommender = require('../../services/cardRecommender');

// Line Bot 配置
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new line.Client(config);
const recommender = new CardRecommender();

// 歡迎訊息
const welcomeMessage = `🎉 歡迎使用信用卡推薦機器人！

💳 我可以幫您找到最適合的信用卡，請告訴我：

🔍 您想要什麼類型的信用卡？
• 旅遊 (出國、哩程)
• 現金回饋
• 數位支付 (LINE Pay、Pi拍錢包)
• 娛樂 (電影、娛樂消費)
• 無年費
• 高回饋

💡 您也可以直接輸入關鍵字，例如：
• "我想要旅遊卡"
• "推薦現金回饋卡"
• "無年費信用卡"
• "LINE Pay卡"

🎯 讓我為您找到最優惠的選擇！`;

// 處理事件
async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const userMessage = event.message.text;
  let replyMessage = '';

  // 處理特殊指令
  if (userMessage === '幫助' || userMessage === 'help' || userMessage === '?' || userMessage === '？') {
    replyMessage = welcomeMessage;
  } else if (userMessage === '所有卡片' || userMessage === '全部') {
    const allCards = recommender.getAllCards();
    replyMessage = recommender.formatRecommendation(allCards);
  } else if (userMessage.includes('詳細') || userMessage.includes('詳情')) {
    // 提取卡片編號
    const cardNumber = userMessage.match(/\d+/);
    if (cardNumber) {
      const card = recommender.getCardById(parseInt(cardNumber[0]));
      if (card) {
        replyMessage = formatCardDetail(card);
      } else {
        replyMessage = "找不到該編號的信用卡，請重新選擇。";
      }
    } else {
      replyMessage = "請輸入「詳細 1」來查看第1張卡的詳細資訊。";
    }
  } else {
    // 一般推薦邏輯
    const recommendations = recommender.recommendByKeyword(userMessage);
    replyMessage = recommender.formatRecommendation(recommendations);
  }

  // 發送回覆
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: replyMessage
  });
}

// 格式化卡片詳細資訊
function formatCardDetail(card) {
  let detail = `📋 ${card.name} 詳細資訊\n\n`;
  detail += `🏦 發卡銀行: ${card.bank}\n`;
  detail += `📂 類別: ${card.category}\n`;
  detail += `💰 回饋率: ${card.cashbackRate}%\n`;
  detail += `💸 年費: ${card.annualFee === 0 ? '免年費' : `NT$ ${card.annualFee}`}\n\n`;
  
  detail += `✨ 主要特色:\n`;
  card.features.forEach((feature, index) => {
    detail += `${index + 1}. ${feature}\n`;
  });
  
  detail += `\n🎯 適合族群:\n`;
  card.bestFor.forEach((target, index) => {
    detail += `${index + 1}. ${target}\n`;
  });
  
  detail += `\n💡 提示: 輸入「幫助」查看更多功能！`;
  
  return detail;
}

// Vercel Serverless Function
module.exports = async (req, res) => {
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

  console.log('收到Line Webhook請求:', req.body);
  
  try {
    // 驗證Line簽名
    const signature = req.headers['x-line-signature'];
    if (!signature) {
      console.log('缺少Line簽名');
      return res.status(400).json({ error: 'Missing signature' });
    }

    // 檢查是否有events
    if (!req.body.events || req.body.events.length === 0) {
      console.log('沒有收到events，可能是Line的驗證請求');
      return res.status(200).json({ message: 'OK' });
    }

    // 處理所有事件
    const results = await Promise.all(req.body.events.map(handleEvent));
    console.log('處理完成，回覆結果:', results);
    
    return res.status(200).json(results);
  } catch (error) {
    console.error('處理事件時發生錯誤:', error);
    return res.status(500).json({ error: error.message });
  }
}; 