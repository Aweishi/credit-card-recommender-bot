const express = require('express');
const line = require('@line/bot-sdk');
require('dotenv').config();

const CardRecommender = require('./services/cardRecommender');
const LLMService = require('./services/llmService');

const app = express();

// Line Bot 配置
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new line.Client(config);
const recommender = new CardRecommender();
const llmService = new LLMService();

// 中間件
app.use('/api/webhook', line.middleware(config));
app.use(express.json());

// 歡迎訊息
const welcomeMessage = `🎉 歡迎使用智能信用卡推薦機器人！

💳 我可以幫您找到最適合的信用卡，請告訴我：

🔍 您想要什麼類型的信用卡？
• 旅遊 (出國、哩程)
• 現金回饋
• 數位支付 (LINE Pay、Pi拍錢包)
• 娛樂 (電影、娛樂消費)
• 無年費
• 高回饋

🤖 AI 智能功能：
• 直接輸入問題，我會用 AI 為您分析
• 輸入 "AI 問題" 來使用純 AI 回覆
• 例如：「AI 推薦適合學生的信用卡」

💡 您也可以直接輸入關鍵字，例如：
• "我想要旅遊卡"
• "推薦現金回饋卡"
• "無年費信用卡"
• "LINE Pay卡"

🎯 讓我為您找到最優惠的選擇！`;

// Webhook 端點
app.post('/api/webhook', (req, res) => {
  console.log('收到Line Webhook請求:', req.body);
  
  // 檢查是否有events
  if (!req.body.events || req.body.events.length === 0) {
    console.log('沒有收到events，可能是Line的驗證請求');
    return res.status(200).json({ message: 'OK' });
  }

  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => {
      console.log('處理完成，回覆結果:', result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error('處理事件時發生錯誤:', err);
      res.status(500).json({ error: err.message });
    });
});

// 處理事件
async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const userMessage = event.message.text;
  let replyMessage = '';

  try {
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
    } else if (userMessage.startsWith('AI ') || userMessage.startsWith('ai ')) {
      // 使用 AI 回覆（當用戶輸入 "AI 問題" 時）
      const aiQuestion = userMessage.substring(3).trim();
      if (aiQuestion) {
        replyMessage = await llmService.getResponse(aiQuestion);
      } else {
        replyMessage = "請在 'AI' 後面輸入您的問題，例如：AI 推薦旅遊信用卡";
      }
    } else {
      // 智能回覆：先嘗試 LLM，如果失敗則使用傳統推薦
      try {
        // 準備信用卡資料作為上下文
        const allCards = recommender.getAllCards();
        const context = `可用的信用卡資料：${allCards.map(card => `${card.name}(${card.bank}) - ${card.category} - ${card.cashbackRate}%回饋`).join(', ')}`;
        
        replyMessage = await llmService.getResponse(userMessage, context);
      } catch (error) {
        console.log('LLM 回覆失敗，使用傳統推薦:', error.message);
        // 如果 LLM 失敗，使用傳統推薦邏輯
        const recommendations = recommender.recommendByKeyword(userMessage);
        replyMessage = recommender.formatRecommendation(recommendations);
      }
    }
  } catch (error) {
    console.error('處理訊息時發生錯誤:', error);
    replyMessage = "抱歉，處理您的訊息時發生錯誤。請稍後再試。";
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

// 健康檢查端點
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: '信用卡推薦機器人運行中',
    timestamp: new Date().toISOString(),
    webhook: '/api/webhook',
    health: '/api/health'
  });
});

// 測試端點
app.get('/test', (req, res) => {
  res.json({
    message: '測試成功！機器人正在運行',
    timestamp: new Date().toISOString()
  });
});

// 健康檢查端點 - 用於Vercel
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: '信用卡推薦機器人運行中',
    timestamp: new Date().toISOString()
  });
});

// 本地開發時啟動伺服器
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 信用卡推薦機器人已啟動在端口 ${PORT}`);
    console.log(`📱 Webhook URL: https://your-domain.com/api/webhook`);
    console.log(`💡 請確保已設定正確的環境變數`);
  });
}

module.exports = app; 