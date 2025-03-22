import jsBridge from "../../bridge";
import { MResponse, MResponseWithData } from "../../model";

export function sqliteOpenDB(
  path: string,
): Promise<MResponseWithData<{ dbKey: number }>> {
  return jsBridge.callNative({
    api: "sqliteOpenDB",
    data: {
      path,
    },
  });
}

export function sqliteCloseDB(dbKey: number): Promise<MResponse> {
  return jsBridge.callNative({
    api: "sqliteCloseDB",
    data: {
      dbKey,
    },
  });
}

export function sqlitePrepare(
  dbKey: number,
  sql: string,
): Promise<MResponseWithData<{ stmtKey: number; reader: boolean }>> {
  return jsBridge.callNative({
    api: "sqlitePrepare",
    data: {
      dbKey,
      sql,
    },
  });
}

export function sqliteStatementAll(
  dbKey: number,
  stmtKey: number,
  parameters: ReadonlyArray<unknown>,
): Promise<MResponseWithData<unknown[]>> {
  return jsBridge.callNative({
    api: "sqliteStatementAll",
    data: {
      dbKey,
      stmtKey,
      parameters,
    },
  });
}

export function sqliteStatementRun(
  dbKey: number,
  stmtKey: number,
  parameters: ReadonlyArray<unknown>,
): Promise<
  MResponseWithData<{
    changes: number | bigint;
    lastInsertRowid: number | bigint;
  }>
> {
  return jsBridge.callNative({
    api: "sqliteStatementRun",
    data: {
      dbKey,
      stmtKey,
      parameters,
    },
  });
}

export function sqliteExecute(
  dbKey: number,
  sql: string,
  parameters: ReadonlyArray<unknown>,
): Promise<
  MResponseWithData<{
    reader: boolean;
    runRes?: {
      changes: number | bigint;
      lastInsertRowid: number | bigint;
    };
    entityData?: unknown[];
  }>
> {
  return jsBridge.callNative({
    api: "sqliteExecute",
    data: {
      dbKey,
      sql,
      parameters,
    },
  });
}

export function sqliteCreateIterator(
  dbKey: number,
  stmtKey: number,
  parameters: ReadonlyArray<unknown>,
): Promise<MResponse> {
  return jsBridge.callNative({
    api: "sqliteCreateIterator",
    data: {
      dbKey,
      stmtKey,
      parameters,
    },
  });
}

export function sqliteIteratorNext(
  dbKey: number,
  stmtKey: number,
): Promise<MResponseWithData<unknown | undefined>> {
  return jsBridge.callNative({
    api: "sqliteIteratorNext",
    data: {
      dbKey,
      stmtKey,
    },
  });
}

export function sqliteIteratorRelease(
  dbKey: number,
  stmtKey: number,
): Promise<MResponse> {
  return jsBridge.callNative({
    api: "sqliteIteratorRelease",
    data: {
      dbKey,
      stmtKey,
    },
  });
}
