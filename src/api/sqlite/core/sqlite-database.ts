import { MinipSqliteStatement } from "./sqlite-statement";
import {
  sqliteCloseDB,
  sqliteOpenDB,
  sqlitePrepare,
  sqliteStatementAll,
  sqliteStatementRun,
} from "./sqlite-native-api";

export class MinipSqliteDatabase {
  path: string;
  id: number;
  debug: boolean;
  constructor(path: string, debug: boolean) {
    this.path = path;
    this.id = -1;
    this.debug = debug;
  }
  async close(): Promise<void> {
    if (this.id === -1) return;
    await sqliteCloseDB(this.id);
  }
  async prepare(sql: string): Promise<MinipSqliteStatement> {
    if (this.id === -1) {
      const res = await sqliteOpenDB(this.path);
      this.id = res.data.dbKey;
    }

    const dbKey = this.id;
    const stmtRes = await sqlitePrepare(dbKey, sql);

    const stmtKey = stmtRes.data.stmtKey;
    const reader = stmtRes.data.reader;

    return {
      reader: reader,
      all(parameters) {
        return sqliteStatementAll(dbKey, stmtKey, parameters).then(
          (res) => res.data,
        );
      },
      run(parameters) {
        return sqliteStatementRun(dbKey, stmtKey, parameters).then(
          (res) => res.data,
        );
      },
      iterate(parameters) {
        throw "Not implemented";
      },
    };
  }
}
