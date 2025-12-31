// GET /test/hello - Say hello function with different greeting options
const mLogger = require("../../configs/logger").getLogger(
    "./routes/ecoupon/add"
);
const Response = require("../../models/Response");

async function sayHello(req, res) {
    mLogger.info(
        "=== Receiving %s %s API call with request data: %j ===",
        req.method,
        req.originalUrl,
        req.body
    );
    const response = new Response();

    try {
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

      response.success().data = {
        message: `${greeting}, ${targetName}!`,
        service: 'nodejs-api-service-base',
        endpoint: '/test/hello',
        parameters: {
          name: targetName,
          language: lang || 'en'
        },
        timestamp: new Date().toISOString()
      };

      return res.json(response);
    } catch (error) {
      mLogger.error("Error in sayHello :", err.message);
      return res.json(response.internalServerError(err.stack));
    }
}

module.exports = sayHello;