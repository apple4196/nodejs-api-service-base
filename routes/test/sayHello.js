// GET /test/hello - Say hello function with different greeting options
module.exports = (req, res) => {
  const { name, lang } = req.query;
  
  const greetings = {
    'en': 'Hello',
    'zh': '你好',
    'ja': 'こんにちは',
    'ko': '안녕하세요',
    'es': 'Hola',
    'fr': 'Bonjour'
  };

  const greeting = greetings[lang] || greetings['en'];
  const targetName = name || 'World';

  res.json({
    message: `${greeting}, ${targetName}!`,
    service: 'nodejs-api-service-base',
    endpoint: '/test/hello',
    parameters: {
      name: targetName,
      language: lang || 'en'
    },
    timestamp: new Date().toISOString()
  });
};
