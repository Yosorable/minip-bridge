// src/bridge/index.ts
var jsBridge;
if (window.webkit?.messageHandlers?.MinipNativeInteraction) {
  const _callNative = window.webkit.messageHandlers.MinipNativeInteraction;
  jsBridge = {
    callNative(req) {
      return _callNative.postMessage(JSON.stringify(req)).then((res) => JSON.parse(res)).then((res) => {
        if (res.code === 0 /* SUCCESS */) {
          res.isSuccess = () => true;
          const hashData = res.data !== null && res.data !== void 0;
          res.hasData = () => hashData;
          return res;
        } else {
          throw new Error(res.msg ?? "Unknown error, res: ");
        }
      });
    },
    callNativeSync(req) {
      const res = prompt(JSON.stringify(req));
      if (res) {
        const r = JSON.parse(res);
        r.isSuccess = () => true;
        const hashData = r.data !== null && r.data !== void 0;
        r.hasData = () => hashData;
        return r;
      }
      return {
        code: 7 /* FAILED */,
        msg: "Unknown error",
        isSuccess: () => false,
        hasData: () => false
      };
    }
  };
} else {
  jsBridge = {
    callNative() {
      return new Promise((_, reject) => {
        reject("Cannot find JavaScript Bridge!!!");
      });
    },
    callNativeSync() {
      return {
        code: 7 /* FAILED */,
        msg: "Cannot find JavaScript Bridge!!!"
      };
    }
  };
}
var bridge_default = jsBridge;

// src/api/sqlite.ts
function sqliteOpenDB(path) {
  return bridge_default.callNative({
    api: "sqliteOpenDB",
    data: {
      path
    }
  });
}
function sqliteCloseDB(dbKey) {
  return bridge_default.callNative({
    api: "sqliteCloseDB",
    data: {
      dbKey
    }
  });
}
function sqlitePrepare(dbKey, sql) {
  return bridge_default.callNative({
    api: "sqlitePrepare",
    data: {
      dbKey,
      sql
    }
  });
}
function sqliteStatementAll(dbKey, stmtKey, parameters) {
  return bridge_default.callNative({
    api: "sqliteStatementAll",
    data: {
      dbKey,
      stmtKey,
      parameters
    }
  });
}
function sqliteStatementRun(dbKey, stmtKey, parameters) {
  return bridge_default.callNative({
    api: "sqliteStatementRun",
    data: {
      dbKey,
      stmtKey,
      parameters
    }
  });
}
function sqliteExecute(dbKey, sql, parameters) {
  return bridge_default.callNative({
    api: "sqliteExecute",
    data: {
      dbKey,
      sql,
      parameters
    }
  });
}
function sqliteCreateIterator(dbKey, stmtKey, parameters) {
  return bridge_default.callNative({
    api: "sqliteCreateIterator",
    data: {
      dbKey,
      stmtKey,
      parameters
    }
  });
}
function sqliteIteratorNext(dbKey, stmtKey) {
  return bridge_default.callNative({
    api: "sqliteIteratorNext",
    data: {
      dbKey,
      stmtKey
    }
  });
}
function sqliteIteratorRelease(dbKey, stmtKey) {
  return bridge_default.callNative({
    api: "sqliteIteratorRelease",
    data: {
      dbKey,
      stmtKey
    }
  });
}

export {
  bridge_default,
  sqliteOpenDB,
  sqliteCloseDB,
  sqlitePrepare,
  sqliteStatementAll,
  sqliteStatementRun,
  sqliteExecute,
  sqliteCreateIterator,
  sqliteIteratorNext,
  sqliteIteratorRelease
};
//# sourceMappingURL=chunk-BHXED4CK.mjs.map