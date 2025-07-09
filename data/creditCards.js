const creditCards = [
  {
    id: 1,
    name: "國泰世華CUBE卡",
    bank: "國泰世華",
    category: "現金回饋",
    annualFee: 0,
    cashbackRate: 0.3,
    features: [
      "國內外消費0.3%現金回饋",
      "無年費門檻",
      "回饋無上限",
      "可選擇回饋方式"
    ],
    bestFor: ["一般消費", "無年費需求", "簡單回饋"],
    imageUrl: "https://example.com/cube-card.jpg"
  },
  {
    id: 2,
    name: "台新FlyGo卡",
    bank: "台新銀行",
    category: "旅遊",
    annualFee: 2400,
    cashbackRate: 2.8,
    features: [
      "國外消費2.8%現金回饋",
      "國內消費1.2%現金回饋",
      "旅遊相關消費額外回饋",
      "機場接送服務"
    ],
    bestFor: ["國外旅遊", "經常出國", "旅遊消費"],
    imageUrl: "https://example.com/flygo-card.jpg"
  },
  {
    id: 3,
    name: "玉山Pi拍錢包信用卡",
    bank: "玉山銀行",
    category: "數位支付",
    annualFee: 0,
    cashbackRate: 2.5,
    features: [
      "Pi拍錢包消費2.5%回饋",
      "一般消費1%回饋",
      "無年費",
      "P幣回饋"
    ],
    bestFor: ["數位支付", "Pi拍錢包用戶", "無年費需求"],
    imageUrl: "https://example.com/pi-card.jpg"
  },
  {
    id: 4,
    name: "中信LINE Pay卡",
    bank: "中國信託",
    category: "數位支付",
    annualFee: 0,
    cashbackRate: 2,
    features: [
      "LINE Pay消費2%回饋",
      "一般消費1%回饋",
      "無年費",
      "LINE Points回饋"
    ],
    bestFor: ["LINE Pay用戶", "數位支付", "無年費需求"],
    imageUrl: "https://example.com/linepay-card.jpg"
  },
  {
    id: 5,
    name: "富邦J卡",
    bank: "台北富邦",
    category: "娛樂",
    annualFee: 0,
    cashbackRate: 3,
    features: [
      "娛樂消費3%回饋",
      "一般消費1%回饋",
      "無年費",
      "電影票優惠"
    ],
    bestFor: ["娛樂消費", "看電影", "無年費需求"],
    imageUrl: "https://example.com/j-card.jpg"
  },
  {
    id: 6,
    name: "永豐DAWHO現金回饋卡",
    bank: "永豐銀行",
    category: "現金回饋",
    annualFee: 0,
    cashbackRate: 2,
    features: [
      "國內消費2%現金回饋",
      "國外消費3%現金回饋",
      "無年費",
      "回饋無上限"
    ],
    bestFor: ["現金回饋", "國內消費", "無年費需求"],
    imageUrl: "https://example.com/dawho-card.jpg"
  },
  {
    id: 7,
    name: "花旗現金回饋PLUS卡",
    bank: "花旗銀行",
    category: "現金回饋",
    annualFee: 2400,
    cashbackRate: 2,
    features: [
      "國內外消費2%現金回饋",
      "回饋無上限",
      "機場貴賓室",
      "旅遊保險"
    ],
    bestFor: ["高消費族群", "經常出國", "現金回饋"],
    imageUrl: "https://example.com/citi-card.jpg"
  },
  {
    id: 8,
    name: "星展飛行世界商務卡",
    bank: "星展銀行",
    category: "航空哩程",
    annualFee: 2400,
    cashbackRate: 0,
    features: [
      "消費累積航空哩程",
      "機場接送服務",
      "機場貴賓室",
      "旅遊保險"
    ],
    bestFor: ["航空哩程", "商務人士", "經常出國"],
    imageUrl: "https://example.com/dbs-card.jpg"
  }
];

module.exports = creditCards; 