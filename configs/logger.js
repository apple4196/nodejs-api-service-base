const log4js = require('log4js');
const { nanoid } = require('nanoid');
const { AsyncLocalStorage } = require('async_hooks'); // Node.js v22 內建模組
const debug = require('./logger_debug_config.js');
const production = require('./logger_production_config.js');


// 創建 AsyncLocalStorage 實例
const asyncLocalStorage = new AsyncLocalStorage();

if (process.env.NODE_ENV === 'production') {
    log4js.configure(production);
} else {
    log4js.configure(debug);
}

// 配置 log4js
// log4js.configure({
//     appenders: {
//         out: {
//             type: 'console',
//             layout: {
//                 type: 'pattern',
//                 pattern: '%d %p %c [%X{requestLogId}] %m%n'
//             }
//         }
//     },
//     categories: {
//         default: { appenders: ['out'], level: 'all' }
//     }
// });

// 包裝 logger，動態從 AsyncLocalStorage 獲取 requestLogId
const getLogger = (category) => {
    const logger = log4js.getLogger(category);
    const originalLogger = {};
    
    // 代理所有日誌方法，動態設置 requestLogId
    ['trace', 'debug', 'info', 'warn', 'error', 'fatal'].forEach(level => {
        originalLogger[level] = logger[level].bind(logger);
        logger[level] = (...args) => {
            const store = asyncLocalStorage.getStore();
            if (store && store.requestLogId) {
                logger.addContext('requestLogId', store.requestLogId);
            } else {
                logger.addContext('requestLogId', 'null');
            }
            originalLogger[level](...args);
        };
    });
    
    return logger;
};

// Express middleware 為每個 request 添加 request log ID
const addRequestLogId = (req, res, next) => {
    const requestLogId = nanoid(12);
    
    // 在 AsyncLocalStorage 中存儲 requestLogId
    asyncLocalStorage.run({ requestLogId }, () => {
        const logger = getLogger();
        // logger.info(`設置 requestLogId: ${requestLogId}`);
        
        // 設置 response header
        res.set('X-REQUEST-LOG-ID', requestLogId);
        
        // 在 response 結束後清除上下文
        res.on('finish', () => {
            logger.removeContext('requestLogId');
        });
        
        next();
    });
};

// Logger 模組
module.exports = {
    express: log4js.connectLogger(getLogger('express'), {
        level: 'auto',
        format: (req, res, format) => {
            const store = asyncLocalStorage.getStore();
            const requestLogId = store ? store.requestLogId : 'null';
            return format(`[${requestLogId}] :method :url`);
        }
    }),
    log4js: log4js,
    getLogger: getLogger,
    addRequestLogId
};