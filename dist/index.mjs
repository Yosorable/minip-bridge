// src/model/response/index.ts
var MResponseStatusCode = /* @__PURE__ */ ((MResponseStatusCode2) => {
  MResponseStatusCode2[MResponseStatusCode2["SUCCESS"] = 0] = "SUCCESS";
  MResponseStatusCode2[MResponseStatusCode2["FAILED"] = 7] = "FAILED";
  return MResponseStatusCode2;
})(MResponseStatusCode || {});

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

// src/api/route.ts
function navigateTo(data) {
  return bridge_default.callNative({
    api: "navigateTo",
    data
  });
}
function navigateBack(delta = 1) {
  return bridge_default.callNative({
    api: "navigateBack",
    data: {
      delta
    }
  });
}
function redirectTo(data) {
  return bridge_default.callNative({
    api: "redirectTo",
    data
  });
}
function openWebsite(url) {
  return bridge_default.callNative({
    api: "openWebsite",
    data: { url }
  });
}
function openSettings() {
  return bridge_default.callNative({
    api: "openSettings"
  });
}

// src/api/app.ts
function closeApp() {
  return bridge_default.callNative({
    api: "closeApp"
  });
}
function showAppDetail() {
  return bridge_default.callNative({
    api: "showAppDetail"
  });
}
function installApp(url) {
  return bridge_default.callNative({
    api: "installApp",
    data: {
      url
    }
  });
}
function getInstalledAppList() {
  return bridge_default.callNative({
    api: "getInstalledAppList"
  });
}

// src/api/ui.ts
function setNavigationBarTitle(title) {
  return bridge_default.callNative({
    api: "setNavigationBarTitle",
    data: {
      title
    }
  });
}
function setNavigationBarColor(config) {
  return bridge_default.callNative({
    api: "setNavigationBarColor",
    data: config
  });
}
function enablePullDownRefresh() {
  return bridge_default.callNative({
    api: "enablePullDownRefresh"
  });
}
function disablePullDownRefresh() {
  return bridge_default.callNative({
    api: "disablePullDownRefresh"
  });
}
function onPullDownRefresh(callback) {
  window.addEventListener("pulldownrefresh", callback);
}
function startPullDownRefresh() {
  return bridge_default.callNative({
    api: "startPullDownRefresh"
  });
}
function stopPullDownRefresh() {
  return bridge_default.callNative({
    api: "stopPullDownRefresh"
  });
}
function showHUD(req) {
  return bridge_default.callNative({
    api: "showHUD",
    data: req
  });
}
function hideHUD() {
  return bridge_default.callNative({
    api: "hideHUD"
  });
}
function showAlert(config) {
  return bridge_default.callNative({
    api: "showAlert",
    data: config
  });
}
function previewImage(url) {
  return bridge_default.callNative({
    api: "previewImage",
    data: {
      url
    }
  });
}
function previewVideo(url) {
  return bridge_default.callNative({
    api: "previewVideo",
    data: {
      url
    }
  });
}
function showPicker(type, data) {
  let res;
  if ((type === "time" || type === "date") && !data.dateFormat) {
    res = bridge_default.callNative({
      api: "showPicker",
      data: {
        type,
        data: {
          ...data,
          dateFormat: type === "date" ? "yyyy-MM-dd" : "HH:mm:ss"
        }
      }
    });
  } else {
    res = bridge_default.callNative({
      api: "showPicker",
      data: { type, data }
    });
  }
  return res;
}

// src/api/kvstorage.ts
function getKVStorage(key) {
  return bridge_default.callNative({
    api: "getKVStorage",
    data: { key }
  });
}
function setKVStorage(key, value) {
  return bridge_default.callNative({
    api: "setKVStorage",
    data: { key, value }
  });
}
function deleteKVStorage(key) {
  return bridge_default.callNative({
    api: "deleteKVStorage",
    data: { key }
  });
}
function clearKVStorage() {
  return bridge_default.callNative({
    api: "clearKVStorage"
  });
}
function getKVStorageSync(key) {
  return bridge_default.callNativeSync({
    api: "getKVStorageSync",
    data: { key }
  });
}
function setKVStorageSync(key, value) {
  return bridge_default.callNativeSync({
    api: "setKVStorageSync",
    data: { key, value }
  });
}
function deleteKVStorageSync(key) {
  return bridge_default.callNativeSync({
    api: "deleteKVStorageSync",
    data: { key }
  });
}
function clearKVStorageSync() {
  return bridge_default.callNativeSync({
    api: "clearKVStorageSync"
  });
}

// src/api/device.ts
function vibrate(type) {
  return bridge_default.callNative({
    api: "vibrate",
    data: {
      type: type ?? "medium"
    }
  });
}
function getClipboardData() {
  return bridge_default.callNative({
    api: "getClipboardData"
  });
}
function setClipboardData(data) {
  return bridge_default.callNative({
    api: "setClipboardData",
    data: {
      data
    }
  });
}
function scanQRCode() {
  return bridge_default.callNative({ api: "scanQRCode" });
}
function getDeviceInfo() {
  return bridge_default.callNative({ api: "getDeviceInfo" });
}
function getDeviceInfoSync() {
  return bridge_default.callNativeSync({ api: "getDeviceInfoSync" });
}

// src/api/sqlite/index.ts
import { Kysely as Kysely2, Migrator } from "kysely";

// src/api/sqlite/native-api.ts
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

// src/api/sqlite/core/sqlite-query-iterator.ts
var MinipSQLiteQueryIterator = class {
  dbKey;
  stmtKey;
  parameters;
  created = false;
  constructor(dbKey, stmtKey, parameters) {
    this.dbKey = dbKey;
    this.stmtKey = stmtKey;
    this.parameters = parameters;
  }
  async next() {
    if (!this.created) {
      await sqliteCreateIterator(this.dbKey, this.stmtKey, this.parameters);
      this.created = true;
    }
    const res = await sqliteIteratorNext(this.dbKey, this.stmtKey);
    if (res.hasData()) return { value: res.data, done: false };
    return { value: void 0, done: true };
  }
  async return() {
    if (this.created) {
      await sqliteIteratorRelease(this.dbKey, this.stmtKey);
    }
    return { value: void 0, done: true };
  }
  [Symbol.asyncIterator]() {
    return this;
  }
};

// src/api/sqlite/core/sqlite-database.ts
var MinipSqliteDatabase = class {
  path;
  id;
  debug;
  constructor(path, debug) {
    this.path = path;
    this.id = -1;
    this.debug = debug;
  }
  async close() {
    if (this.id === -1) return;
    await sqliteCloseDB(this.id);
  }
  async prepare(sql) {
    if (this.id === -1) {
      const res = await sqliteOpenDB(this.path);
      this.id = res.data.dbKey;
    }
    const dbKey = this.id;
    const stmtRes = await sqlitePrepare(dbKey, sql);
    const stmtKey = stmtRes.data.stmtKey;
    const reader = stmtRes.data.reader;
    return {
      reader,
      all(parameters) {
        return sqliteStatementAll(dbKey, stmtKey, parameters).then(
          (res) => res.data
        );
      },
      run(parameters) {
        return sqliteStatementRun(dbKey, stmtKey, parameters).then(
          (res) => res.data
        );
      },
      iterate(parameters) {
        return new MinipSQLiteQueryIterator(dbKey, stmtKey, parameters);
      }
    };
  }
};

// src/api/sqlite/core/sqlite-dialect.ts
import {
  SqliteAdapter,
  SqliteIntrospector,
  SqliteQueryCompiler
} from "kysely";

// src/api/sqlite/core/sqlite-driver.ts
import {
  CompiledQuery as CompiledQuery2
} from "kysely";

// src/api/sqlite/core/sqlite-connection.ts
import {
  SelectQueryNode
} from "kysely";
var MinipSqliteConnection = class {
  #db;
  constructor(db) {
    this.#db = db;
  }
  async executeQuery(compiledQuery) {
    const { sql, parameters } = compiledQuery;
    if (this.#db.debug) {
      console.debug(sql, parameters);
    }
    const stmt = await this.#db.prepare(sql);
    if (stmt.reader) {
      return {
        rows: await stmt.all(parameters)
      };
    } else {
      const { changes, lastInsertRowid } = await stmt.run(parameters);
      const numAffectedRows = changes !== void 0 && changes !== null ? BigInt(changes) : void 0;
      return {
        numUpdatedOrDeletedRows: numAffectedRows,
        numAffectedRows,
        insertId: lastInsertRowid !== void 0 && lastInsertRowid !== null ? BigInt(lastInsertRowid) : void 0,
        rows: []
      };
    }
  }
  async *streamQuery(compiledQuery, _chunkSize) {
    const { sql, parameters, query } = compiledQuery;
    const stmt = await this.#db.prepare(sql);
    if (SelectQueryNode.is(query)) {
      const iter = stmt.iterate(parameters);
      for await (const row of iter) {
        yield {
          rows: [row]
        };
      }
    } else {
      throw new Error(
        "Sqlite driver only supports streaming of select queries"
      );
    }
  }
};

// src/api/sqlite/core/sqlite-driver.ts
var MinipSqliteDriver = class {
  #config;
  #db;
  #connection;
  constructor(config) {
    this.#config = config;
  }
  async init() {
    this.#db = this.#config.database;
    this.#connection = new MinipSqliteConnection(this.#db);
    if (this.#config.onCreateConnection) {
      await this.#config.onCreateConnection(this.#connection);
    }
  }
  async acquireConnection() {
    return this.#connection;
  }
  async beginTransaction(connection, settings) {
    await connection.executeQuery(CompiledQuery2.raw("begin"));
  }
  async commitTransaction(connection) {
    await connection.executeQuery(CompiledQuery2.raw("commit"));
  }
  async rollbackTransaction(connection) {
    await connection.executeQuery(CompiledQuery2.raw("rollback"));
  }
  async releaseConnection(connection) {
  }
  async destroy() {
    this.#db?.close();
  }
};

// src/api/sqlite/core/sqlite-dialect.ts
var MinipSqliteDialect = class {
  #config;
  constructor(config) {
    this.#config = config;
  }
  createDriver() {
    return new MinipSqliteDriver(this.#config);
  }
  createQueryCompiler() {
    return new SqliteQueryCompiler();
  }
  createAdapter() {
    return new SqliteAdapter();
  }
  createIntrospector(db) {
    return new SqliteIntrospector(db);
  }
};

// src/api/sqlite/index.ts
function openSqliteDB(props) {
  const dialect = new MinipSqliteDialect({
    database: new MinipSqliteDatabase(props.path, props.debug ?? false)
  });
  const db = new Kysely2({
    dialect
  });
  if (props.migratorProps) {
    const migrator = new Migrator({
      db,
      ...props.migratorProps
    });
    return {
      db,
      migrator
    };
  }
  return { db };
}

// src/api/memory-cache.ts
function getMemoryStorage(key) {
  return bridge_default.callNative({
    api: "getMemoryStorage",
    data: { key }
  });
}
function setMemoryStorage(key, value) {
  return bridge_default.callNative({
    api: "setMemoryStorage",
    data: { key, value }
  });
}
function setMemoryStorageIfNotExist(key, value) {
  return bridge_default.callNative({
    api: "setMemoryStorageIfNotExist",
    data: { key, value }
  });
}
function removeMemoryStorage(key) {
  return bridge_default.callNative({
    api: "removeMemoryStorage",
    data: { key }
  });
}
function clearMemoryStorage() {
  return bridge_default.callNative({
    api: "clearMemoryStorage"
  });
}

// src/index.ts
export * from "kysely";
export {
  MResponseStatusCode,
  clearKVStorage,
  clearKVStorageSync,
  clearMemoryStorage,
  closeApp,
  deleteKVStorage,
  deleteKVStorageSync,
  disablePullDownRefresh,
  enablePullDownRefresh,
  getClipboardData,
  getDeviceInfo,
  getDeviceInfoSync,
  getInstalledAppList,
  getKVStorage,
  getKVStorageSync,
  getMemoryStorage,
  hideHUD,
  installApp,
  navigateBack,
  navigateTo,
  onPullDownRefresh,
  openSettings,
  openSqliteDB,
  openWebsite,
  previewImage,
  previewVideo,
  redirectTo,
  removeMemoryStorage,
  scanQRCode,
  setClipboardData,
  setKVStorage,
  setKVStorageSync,
  setMemoryStorage,
  setMemoryStorageIfNotExist,
  setNavigationBarColor,
  setNavigationBarTitle,
  showAlert,
  showAppDetail,
  showHUD,
  showPicker,
  startPullDownRefresh,
  stopPullDownRefresh,
  vibrate
};
//# sourceMappingURL=index.mjs.map