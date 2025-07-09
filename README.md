# 信用卡推薦Line機器人

這是一個智能的Line機器人，可以根據用戶需求推薦最適合的信用卡。

## 功能特色

- 🎯 **智能推薦**: 根據關鍵字推薦最適合的信用卡
- 💳 **豐富資料庫**: 包含8張熱門信用卡的詳細資訊
- 🔍 **多種分類**: 旅遊、現金回饋、數位支付、娛樂等
- 💰 **回饋率比較**: 自動按回饋率排序推薦
- 📱 **Line整合**: 完整的Line Bot功能

## 支援的信用卡類型

1. **旅遊卡**: 台新FlyGo卡、星展飛行世界商務卡
2. **現金回饋**: 國泰世華CUBE卡、永豐DAWHO卡、花旗現金回饋PLUS卡
3. **數位支付**: 玉山Pi拍錢包卡、中信LINE Pay卡
4. **娛樂卡**: 富邦J卡

## 安裝步驟

### 1. 克隆專案
```bash
git clone <your-repo-url>
cd credit-card-recommender-bot
```

### 2. 安裝依賴
```bash
npm install
```

### 3. 設定環境變數
複製 `env.example` 為 `.env` 並填入您的Line Bot資訊：
```bash
cp env.example .env
```

編輯 `.env` 文件：
```env
LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token_here
LINE_CHANNEL_SECRET=your_channel_secret_here
PORT=3000
```

### 4. 啟動機器人
```bash
# 開發模式
npm run dev

# 生產模式
npm start
```

## Line Bot 設定

### 1. 創建Line Bot Channel
1. 前往 [Line Developers Console](https://developers.line.biz/)
2. 創建新的Provider和Channel
3. 選擇 "Messaging API" 類型
4. 記錄下 Channel Secret 和 Channel Access Token

### 2. 設定Webhook URL
在Line Developers Console中設定Webhook URL：
```
https://your-domain.com/webhook
```

### 3. 啟用Webhook
在Line Developers Console中啟用 "Use webhook" 選項。

## 使用方式

### 基本指令
- `幫助` 或 `help` - 顯示使用說明
- `所有卡片` 或 `全部` - 顯示所有信用卡
- `詳細 1` - 查看第1張卡的詳細資訊

### 關鍵字推薦
- `旅遊` - 推薦旅遊相關信用卡
- `現金回饋` - 推薦現金回饋卡
- `數位支付` - 推薦數位支付卡
- `娛樂` - 推薦娛樂消費卡
- `無年費` - 推薦免年費信用卡
- `高回饋` - 推薦高回饋率信用卡

### 範例對話
```
用戶: 我想要旅遊卡
機器人: 🎯 為您推薦以下信用卡：
1. 台新FlyGo卡 (台新銀行)
   💳 類別: 旅遊
   💰 回饋率: 2.8%
   💸 年費: NT$ 2400
   ✨ 特色: 國外消費2.8%現金回饋, 國內消費1.2%現金回饋
   🎯 適合: 國外旅遊, 經常出國, 旅遊消費
```

## 部署到雲端

### 使用Heroku
1. 創建Heroku應用
2. 設定環境變數
3. 部署程式碼

### 使用Vercel
1. 連接GitHub倉庫
2. 設定環境變數
3. 自動部署

### 使用Railway
1. 連接GitHub倉庫
2. 設定環境變數
3. 自動部署

## 專案結構

```
credit-card-recommender-bot/
├── app.js                 # 主程式
├── package.json           # 依賴配置
├── env.example           # 環境變數範例
├── README.md             # 說明文件
├── data/
│   └── creditCards.js    # 信用卡資料庫
└── services/
    └── cardRecommender.js # 推薦邏輯
```

## 自定義信用卡資料

您可以編輯 `data/creditCards.js` 來添加或修改信用卡資訊：

```javascript
{
  id: 9,
  name: "新信用卡",
  bank: "銀行名稱",
  category: "類別",
  annualFee: 0,
  cashbackRate: 1.5,
  features: ["特色1", "特色2"],
  bestFor: ["適合族群1", "適合族群2"]
}
```

## 故障排除

### 常見問題

1. **Webhook驗證失敗**
   - 檢查Channel Secret是否正確
   - 確認Webhook URL格式正確

2. **機器人無回應**
   - 檢查伺服器是否正常運行
   - 確認環境變數設定正確
   - 查看伺服器日誌

3. **推薦結果不準確**
   - 檢查關鍵字映射設定
   - 確認信用卡資料完整性

## 貢獻

歡迎提交Issue和Pull Request來改善這個專案！

## 授權

MIT License

## 聯絡資訊

如有問題，請透過GitHub Issues聯絡。 