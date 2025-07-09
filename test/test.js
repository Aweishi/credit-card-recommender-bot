const CardRecommender = require('../services/cardRecommender');

// 創建推薦器實例
const recommender = new CardRecommender();

console.log('🧪 開始測試信用卡推薦系統...\n');

// 測試1: 旅遊關鍵字
console.log('📋 測試1: 旅遊關鍵字');
const travelCards = recommender.recommendByKeyword('旅遊');
console.log(recommender.formatRecommendation(travelCards));
console.log('\n' + '='.repeat(50) + '\n');

// 測試2: 現金回饋關鍵字
console.log('📋 測試2: 現金回饋關鍵字');
const cashbackCards = recommender.recommendByKeyword('現金回饋');
console.log(recommender.formatRecommendation(cashbackCards));
console.log('\n' + '='.repeat(50) + '\n');

// 測試3: 數位支付關鍵字
console.log('📋 測試3: 數位支付關鍵字');
const digitalCards = recommender.recommendByKeyword('LINE Pay');
console.log(recommender.formatRecommendation(digitalCards));
console.log('\n' + '='.repeat(50) + '\n');

// 測試4: 無年費關鍵字
console.log('📋 測試4: 無年費關鍵字');
const noFeeCards = recommender.recommendByKeyword('無年費');
console.log(recommender.formatRecommendation(noFeeCards));
console.log('\n' + '='.repeat(50) + '\n');

// 測試5: 詳細資訊
console.log('📋 測試5: 詳細資訊');
const card1 = recommender.getCardById(1);
if (card1) {
  console.log(`📋 ${card1.name} 詳細資訊\n`);
  console.log(`🏦 發卡銀行: ${card1.bank}`);
  console.log(`📂 類別: ${card1.category}`);
  console.log(`💰 回饋率: ${card1.cashbackRate}%`);
  console.log(`💸 年費: ${card1.annualFee === 0 ? '免年費' : `NT$ ${card1.annualFee}`}\n`);
  
  console.log(`✨ 主要特色:`);
  card1.features.forEach((feature, index) => {
    console.log(`${index + 1}. ${feature}`);
  });
  
  console.log(`\n🎯 適合族群:`);
  card1.bestFor.forEach((target, index) => {
    console.log(`${index + 1}. ${target}`);
  });
}

console.log('\n✅ 測試完成！'); 