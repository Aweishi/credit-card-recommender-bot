const creditCards = require('../data/creditCards');

class CardRecommender {
  constructor() {
    this.cards = creditCards;
  }

  // 根據關鍵字推薦信用卡
  recommendByKeyword(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    
    // 定義關鍵字映射
    const keywordMap = {
      '旅遊': ['旅遊', '出國', '國外', '機場', '哩程', 'flygo'],
      '現金回饋': ['現金', '回饋', '現金回饋', 'dawho', 'citi'],
      '數位支付': ['line', 'pi', '數位', '支付', '電子'],
      '娛樂': ['電影', '娛樂', 'j卡', '富邦'],
      '無年費': ['無年費', '免年費', '0年費'],
      '高回饋': ['高回饋', '高回饋率', '2%', '3%']
    };

    // 找到匹配的類別
    let matchedCategory = null;
    for (const [category, keywords] of Object.entries(keywordMap)) {
      if (keywords.some(k => lowerKeyword.includes(k))) {
        matchedCategory = category;
        break;
      }
    }

    // 根據類別篩選卡片
    let filteredCards = [];
    if (matchedCategory) {
      switch (matchedCategory) {
        case '旅遊':
          filteredCards = this.cards.filter(card => 
            card.category === '旅遊' || card.category === '航空哩程'
          );
          break;
        case '現金回饋':
          filteredCards = this.cards.filter(card => 
            card.category === '現金回饋'
          );
          break;
        case '數位支付':
          filteredCards = this.cards.filter(card => 
            card.category === '數位支付'
          );
          break;
        case '娛樂':
          filteredCards = this.cards.filter(card => 
            card.category === '娛樂'
          );
          break;
        case '無年費':
          filteredCards = this.cards.filter(card => 
            card.annualFee === 0
          );
          break;
        case '高回饋':
          filteredCards = this.cards.filter(card => 
            card.cashbackRate >= 2
          );
          break;
      }
    }

    // 如果沒有找到匹配的類別，返回所有卡片
    if (filteredCards.length === 0) {
      filteredCards = this.cards;
    }

    // 按回饋率排序
    filteredCards.sort((a, b) => b.cashbackRate - a.cashbackRate);

    return filteredCards.slice(0, 3); // 返回前3張
  }

  // 根據消費習慣推薦
  recommendBySpendingHabits(habits) {
    let recommendations = [];

    if (habits.includes('經常出國')) {
      recommendations.push(...this.cards.filter(card => 
        card.category === '旅遊' || card.category === '航空哩程'
      ));
    }

    if (habits.includes('使用數位支付')) {
      recommendations.push(...this.cards.filter(card => 
        card.category === '數位支付'
      ));
    }

    if (habits.includes('看電影')) {
      recommendations.push(...this.cards.filter(card => 
        card.category === '娛樂'
      ));
    }

    if (habits.includes('一般消費')) {
      recommendations.push(...this.cards.filter(card => 
        card.category === '現金回饋' && card.annualFee === 0
      ));
    }

    // 去重並排序
    const uniqueCards = recommendations.filter((card, index, self) => 
      index === self.findIndex(c => c.id === card.id)
    );

    return uniqueCards.sort((a, b) => b.cashbackRate - a.cashbackRate).slice(0, 3);
  }

  // 獲取所有卡片
  getAllCards() {
    return this.cards;
  }

  // 根據ID獲取特定卡片
  getCardById(id) {
    return this.cards.find(card => card.id === id);
  }

  // 格式化推薦結果
  formatRecommendation(cards) {
    if (cards.length === 0) {
      return "抱歉，沒有找到符合條件的信用卡。請嘗試其他關鍵字。";
    }

    let message = "🎯 為您推薦以下信用卡：\n\n";
    
    cards.forEach((card, index) => {
      message += `${index + 1}. ${card.name} (${card.bank})\n`;
      message += `   💳 類別: ${card.category}\n`;
      message += `   💰 回饋率: ${card.cashbackRate}%\n`;
      message += `   💸 年費: ${card.annualFee === 0 ? '免年費' : `NT$ ${card.annualFee}`}\n`;
      message += `   ✨ 特色: ${card.features.slice(0, 2).join(', ')}\n`;
      message += `   🎯 適合: ${card.bestFor.join(', ')}\n\n`;
    });

    message += "💡 提示: 您可以輸入「旅遊」、「現金回饋」、「數位支付」等關鍵字來獲得更精準的推薦！";
    
    return message;
  }
}

module.exports = CardRecommender; 