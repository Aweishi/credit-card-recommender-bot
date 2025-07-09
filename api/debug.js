module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log('=== DEBUG 端點被呼叫 ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('========================');

  return res.status(200).json({
    message: 'Debug端點正常運作',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    hasBody: !!req.body,
    bodyKeys: req.body ? Object.keys(req.body) : [],
    headers: {
      'x-line-signature': req.headers['x-line-signature'] ? '存在' : '不存在',
      'content-type': req.headers['content-type']
    }
  });
}; 