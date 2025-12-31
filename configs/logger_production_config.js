module.exports = {
    "appenders": {
        out: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: '%d %p %c [%X{requestLogId}] %m'
            }
        }
    },
    "categories": {
      "default": { "appenders": [ "out" ], "level": "info" }
    }
}
