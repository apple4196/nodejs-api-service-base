module.exports = {
  appenders: {
    // debug: JSON 換行格式
    debugFilter: {
      type: "logLevelFilter",
      level: "debug",
      maxLevel: "debug",
      appender: "debugAppender"
    },
    debugAppender: {
      type: "console",
      layout: {
        type: "pattern",
        pattern: "%d %p %c [%X{requestLogId}] %x{msg}%n",
        tokens: {
          msg: (logEvent) => {
            return logEvent.data.map((d) => {
              if (typeof d === "object") {
                return JSON.stringify(d, null, 2);
              }
              return d;
            }).join(" ");
          }
        }
      }
    },

    // info 以上: 簡單一行輸出
    infoFilter: {
      type: "logLevelFilter",
      level: "info",
      appender: "infoAppender"
    },
    infoAppender: {
      type: "console",
      layout: {
        type: "pattern",
        pattern: "%d %p %c [%X{requestLogId}] %m%n"
      }
    }
  },

  categories: {
    default: {
      appenders: ["debugFilter", "infoFilter"],
      level: "debug"
    }
  }
};
