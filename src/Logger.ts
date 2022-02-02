import getCurrentLine from 'get-current-line';

// export enum LOG_TYPE {
//   DEBUG = 'DEBUG',
//   ERROR = 'ERROR',
//   INFO = 'INFO',
//   WARN = 'WARN',
//   VERBOSE = 'VERBOSE',
// }
// const LOG_LEVELS = {
//   VERBOSE: 1,
//   DEBUG: 2,
//   INFO: 3,
//   WARN: 4,
//   ERROR: 5,
// };
//
const MAIN_CONFIG = {
  ENABLE_LOGS: !__DEV__,
};
//
// export class Logger {
//   loggerName: string = '';
//   debug: any;
//   constructor() {
//     for (let m in console) {
//       if (typeof console[m] === 'function')
//         this.debug[m] = console[m].bind(window.console, 'asdasds');
//     }
//   }
//   _log(type: LOG_TYPE, ...msg: any) {
//
//     let logger_level_name = type;
//
//     // if (ConsoleLogger.LOG_LEVEL) {
//     //   logger_level_name = ConsoleLogger.LOG_LEVEL;
//     // }
//     if (typeof (<any>window) !== 'undefined' && (<any>window).LOG_LEVEL) {
//       logger_level_name = (<any>window).LOG_LEVEL;
//     }
//     const logger_level = LOG_LEVELS[logger_level_name];
//     const type_level = LOG_LEVELS[type];
//     if (!(type_level >= logger_level)) {
//       // Do nothing if type is not greater than or equal to logger level (handle undefined)
//       return;
//     }
//
//     let log = console.log.bind(console);
//     if (type === LOG_TYPE.ERROR && console.error) {
//       log = console.error.bind(console);
//     }
//     if (type === LOG_TYPE.WARN && console.warn) {
//       log = console.warn.bind(console);
//     }
//
//     const prefix = `[${type}] ${this._ts()} ${this.loggerName}`;
//     let message = '';
//
//     if (msg.length === 1 && typeof msg[0] === 'string') {
//       message = `${prefix} - ${msg[0]}`;
//       log(message);
//     } else if (msg.length === 1) {
//       message = `${prefix} ${msg[0]}`;
//       log(prefix, msg[0]);
//     } else if (typeof msg[0] === 'string') {
//       let obj = msg.slice(1);
//       if (obj.length === 1) {
//         obj = obj[0];
//       }
//       message = `${prefix} - ${msg[0]} ${obj}`;
//       log(`${prefix} - ${msg[0]}`, obj);
//     } else {
//       message = `${prefix} ${msg}`;
//       log(prefix, msg);
//     }
//
//     // for (const plugin of this._pluggables) {
//     //   const logEvent: any = { message, timestamp: Date.now() };
//     //   plugin.pushLogs([logEvent]);
//     // }
//   }
//   set name(name: string) {
//     this.loggerName = name;
//   }
const _ts = () => {
  const dt = new Date();
  return (
    [
      _padding(dt.getHours()),
      _padding(dt.getMinutes()),
      _padding(dt.getSeconds()),
    ].join(':') +
    '.' +
    dt.getMilliseconds() +
    'ms'
  );
};
const _padding = (n: number) => {
  return n < 10 ? '0' + n : '' + n;
};
//
//   log = MAIN_CONFIG.ENABLE_LOGS ? console.log.bind(window.console) : () => {};
//
//   warn = (...args: Array<any>) => {
//     if (MAIN_CONFIG.ENABLE_LOGS) {
//       console.warn(...args);
//     }
//   };
//
//   info = (...args: Array<any>) => {
//     if (MAIN_CONFIG.ENABLE_LOGS) {
//       console.info(...args);
//     }
//   };
//   err = (...args: Array<any>) => {
//     if (MAIN_CONFIG.ENABLE_LOGS) {
//       console.error(...args);
//     }
//   };
//   time = (...args: Array<any>) => {
//     if (MAIN_CONFIG.ENABLE_LOGS) {
//       console.time(...args);
//     }
//   };
//   timeEnd = (...args: Array<any>) => {
//     if (MAIN_CONFIG.ENABLE_LOGS) {
//       console.timeEnd(...args);
//     }
//   };
// }
export function Logger() {
  const debug = {};
  if (!window.console) return function () {};
  // if (gState && klass?.isDebug) {
  //   for (var m in console)
  //     if (typeof console[m] === 'function')
  // this.debug[m] = console[m].bind(
  //   window.console
  //   // klass.toString() + ': '
  // );
  // } else {
  //   for (var m in console)
  //     if (typeof console[m] === 'function') this.debug[m] = function () {};
  // }

  for (let m in console) {
    // @ts-ignore
    if (typeof console[m] === 'function')
      // @ts-ignore
      debug[m] = MAIN_CONFIG.ENABLE_LOGS
        ? // @ts-ignore
          console[m].bind(window.console, `[ ${m.toUpperCase()} ] - ${_ts()}`)
        : // console[m].apply(console, arguments)
          // .apply((e) => {
          //   console.log(e);
          // })
          (e: any) => {
            console.log(getCurrentLine());
            console.log(`[ ${m.toUpperCase()} ] - ${_ts()}`, e);
          };
  }
  return debug;
}
