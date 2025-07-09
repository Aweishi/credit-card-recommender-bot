# 🚀 Line機器人部署指南

## 📍 當前狀態
您的機器人目前運行在本地端口 3000，這意味著：
- ✅ 機器人程式已啟動
- ✅ 正在監聽本地網路
- ❌ 外部無法訪問（Line無法連接）

## 🌐 部署選項

### 選項1：使用Railway（推薦，免費且簡單）

1. **註冊Railway帳號**
   - 前往 [Railway.app](https://railway.app/)
   - 使用GitHub帳號登入

2. **連接GitHub倉庫**
   - 點擊 "New Project"
   - 選擇 "Deploy from GitHub repo"
   - 選擇您的信用卡機器人倉庫

3. **設定環境變數**
   - 在Railway專案設定中添加：
   ```
   LINE_CHANNEL_ACCESS_TOKEN=eKrKvIpvPk8ohI8UzSVMFc8OXUJjuW4UHBmrj21KaCc4IjY75BF8c75WIHujwSA+bkE+kkWf2sHfp22m3cVSJGRp4F2PaBVW2Uz31xaMJcuYZcbWsQtwqmVw2+kF0iMcfAM4NkbZ8svN+b/ryY5z9wdB04t89/1O/w1cDnyilFU=
   LINE_CHANNEL_SECRET=40a21e3cb7d58767fa56852e4526a81b
   ```

4. **自動部署**
   - Railway會自動檢測package.json並部署
   - 部署完成後會提供一個網址，例如：`https://your-app.railway.app`

### 選項2：使用Vercel（免費且快速）

1. **註冊Vercel帳號**
   - 前往 [Vercel.com](https://vercel.com/)
   - 使用GitHub帳號登入

2. **導入專案**
   - 點擊 "New Project"
   - 選擇您的GitHub倉庫
   - 選擇 "Node.js" 框架

3. **設定環境變數**
   - 在專案設定中添加環境變數
   - 部署後會得到網址：`https://your-app.vercel.app`

### 選項3：使用Heroku（付費但穩定）

1. **註冊Heroku帳號**
   - 前往 [Heroku.com](https://heroku.com/)
   - 創建帳號

2. **安裝Heroku CLI**
   ```bash
   # macOS
   brew install heroku/brew/heroku
   
   # 或從官網下載
   ```

3. **部署**
   ```bash
   heroku login
   heroku create your-bot-name
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

4. **設定環境變數**
   ```bash
   heroku config:set LINE_CHANNEL_ACCESS_TOKEN=your_token
   heroku config:set LINE_CHANNEL_SECRET=your_secret
   ```

## 🔗 設定Line Webhook

部署完成後，您會得到一個網址，例如：
`https://your-app.railway.app`

### 在Line Developers Console中設定：

1. **登入Line Developers**
   - 前往 [developers.line.biz](https://developers.line.biz/)

2. **設定Webhook URL**
   - 進入您的Channel設定
   - 在 "Messaging API" 頁面
   - 設定 Webhook URL：`https://your-app.railway.app/webhook`

3. **啟用Webhook**
   - 開啟 "Use webhook" 選項
   - 驗證Webhook URL

## 🧪 測試機器人

設定完成後：

1. **掃描QR Code**
   - 在Line Developers Console中找到QR Code
   - 用Line掃描加入機器人

2. **測試功能**
   - 發送「幫助」查看說明
   - 輸入「旅遊」測試推薦功能
   - 輸入「現金回饋」測試分類功能

## 🔧 故障排除

### 常見問題：

1. **Webhook驗證失敗**
   - 檢查網址是否正確
   - 確認伺服器正在運行
   - 檢查環境變數設定

2. **機器人無回應**
   - 檢查伺服器日誌
   - 確認Line Bot設定正確
   - 測試本地功能

3. **部署失敗**
   - 檢查package.json格式
   - 確認所有依賴都已安裝
   - 查看部署日誌

## 📊 監控和維護

### 查看日誌：
- **Railway**: 在專案頁面查看日誌
- **Vercel**: 在Functions頁面查看
- **Heroku**: `heroku logs --tail`

### 更新機器人：
- 推送新程式碼到GitHub
- 雲端平台會自動重新部署

## 🎉 完成！

部署完成後，您的信用卡推薦機器人就可以：
- 🌍 24/7 全天候運行
- 📱 為全球Line用戶提供服務
- 🎯 智能推薦最適合的信用卡
- 💰 幫助用戶省錢賺回饋

恭喜您成功創建並部署了Line機器人！🎊 