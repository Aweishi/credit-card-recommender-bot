const axios = require('axios');

class LLMService {
  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
    this.geminiApiKey = process.env.GEMINI_API_KEY;
    this.claudeApiKey = process.env.CLAUDE_API_KEY;
  }

  // 使用 OpenAI GPT
  async callOpenAI(userMessage, context = '') {
    if (!this.openaiApiKey) {
      throw new Error('OpenAI API Key 未設定');
    }

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `你是一個專業的信用卡推薦助手。請根據用戶的需求推薦最適合的信用卡。

${context}

請用中文回覆，並提供實用的建議。`
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API 錯誤:', error.response?.data || error.message);
      throw new Error('無法連接到 OpenAI API');
    }
  }

  // 使用 Google Gemini
  async callGemini(userMessage, context = '') {
    if (!this.geminiApiKey) {
      throw new Error('Gemini API Key 未設定');
    }

    try {
      const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.geminiApiKey}`, {
        contents: [{
          parts: [{
            text: `你是一個專業的信用卡推薦助手。請根據用戶的需求推薦最適合的信用卡。

${context}

用戶問題: ${userMessage}

請用中文回覆，並提供實用的建議。`
          }]
        }],
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7
        }
      });

      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API 錯誤:', error.response?.data || error.message);
      throw new Error('無法連接到 Gemini API');
    }
  }

  // 使用 Claude
  async callClaude(userMessage, context = '') {
    if (!this.claudeApiKey) {
      throw new Error('Claude API Key 未設定');
    }

    try {
      const response = await axios.post('https://api.anthropic.com/v1/messages', {
        model: 'claude-3-sonnet-20240229',
        max_tokens: 500,
        messages: [{
          role: 'user',
          content: `你是一個專業的信用卡推薦助手。請根據用戶的需求推薦最適合的信用卡。

${context}

用戶問題: ${userMessage}

請用中文回覆，並提供實用的建議。`
        }]
      }, {
        headers: {
          'x-api-key': this.claudeApiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        }
      });

      return response.data.content[0].text;
    } catch (error) {
      console.error('Claude API 錯誤:', error.response?.data || error.message);
      throw new Error('無法連接到 Claude API');
    }
  }

  // 智能選擇 LLM 服務
  async getResponse(userMessage, context = '') {
    // 優先順序：OpenAI > Gemini > Claude
    if (this.openaiApiKey) {
      try {
        return await this.callOpenAI(userMessage, context);
      } catch (error) {
        console.log('OpenAI 失敗，嘗試 Gemini...');
      }
    }

    if (this.geminiApiKey) {
      try {
        return await this.callGemini(userMessage, context);
      } catch (error) {
        console.log('Gemini 失敗，嘗試 Claude...');
      }
    }

    if (this.claudeApiKey) {
      try {
        return await this.callClaude(userMessage, context);
      } catch (error) {
        console.log('Claude 也失敗了');
      }
    }

    // 如果所有 LLM 都失敗，返回預設回覆
    return this.getFallbackResponse(userMessage);
  }

  // 預設回覆（當 LLM 不可用時）
  getFallbackResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('旅遊') || lowerMessage.includes('出國')) {
      return `✈️ 推薦旅遊信用卡：
1. 國泰世華 CUBE 卡 - 海外消費 3% 回饋
2. 玉山 FlyGo 卡 - 海外消費 2.5% 回饋
3. 台新 FlyGo 卡 - 海外消費 2.2% 回饋

💡 建議選擇有海外手續費減免的卡片！`;
    }
    
    if (lowerMessage.includes('現金') || lowerMessage.includes('回饋')) {
      return `💰 推薦現金回饋信用卡：
1. 台新 @GoGo 卡 - 數位通路 3.5% 回饋
2. 永豐 DAWHO 卡 - 數位通路 3% 回饋
3. 國泰世華 CUBE 卡 - 一般消費 1% 回饋

💡 建議根據您的消費習慣選擇！`;
    }
    
    if (lowerMessage.includes('line') || lowerMessage.includes('數位')) {
      return `📱 推薦數位支付信用卡：
1. 台新 @GoGo 卡 - LINE Pay 3.5% 回饋
2. 永豐 DAWHO 卡 - 數位通路 3% 回饋
3. 玉山 Pi 拍錢包卡 - Pi 拍錢包 3% 回饋

💡 數位支付回饋通常較高！`;
    }
    
    if (lowerMessage.includes('無年費') || lowerMessage.includes('免年費')) {
      return `🎉 推薦免年費信用卡：
1. 台新 @GoGo 卡 - 首年免年費
2. 永豐 DAWHO 卡 - 首年免年費
3. 玉山 Pi 拍錢包卡 - 首年免年費

💡 大部分信用卡都有首年免年費優惠！`;
    }
    
    return `💳 信用卡推薦助手為您服務！

🔍 您可以詢問：
• 旅遊信用卡推薦
• 現金回饋信用卡
• 數位支付信用卡
• 免年費信用卡
• 高回饋信用卡

💡 請告訴我您的具體需求，我會為您推薦最適合的信用卡！`;
  }
}

module.exports = LLMService; 