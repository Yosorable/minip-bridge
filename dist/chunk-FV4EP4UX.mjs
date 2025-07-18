import {
  bridge_default
} from "./chunk-HTON224K.mjs";

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
//# sourceMappingURL=chunk-FV4EP4UX.mjs.map