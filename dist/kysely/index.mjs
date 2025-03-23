import {
  sqliteCloseDB,
  sqliteCreateIterator,
  sqliteIteratorNext,
  sqliteIteratorRelease,
  sqliteOpenDB,
  sqlitePrepare,
  sqliteStatementAll,
  sqliteStatementRun
} from "../chunk-BHXED4CK.mjs";

// src/kysely/index.ts
import { Kysely as Kysely2, Migrator } from "kysely";

// src/kysely/core/sqlite-query-iterator.ts
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

// src/kysely/core/sqlite-database.ts
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

// src/kysely/core/sqlite-dialect.ts
import {
  SqliteAdapter,
  SqliteIntrospector,
  SqliteQueryCompiler
} from "kysely";

// src/kysely/core/sqlite-driver.ts
import {
  CompiledQuery as CompiledQuery2
} from "kysely";

// src/kysely/core/sqlite-connection.ts
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

// src/kysely/core/sqlite-driver.ts
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

// src/kysely/core/sqlite-dialect.ts
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

// src/kysely/index.ts
function openSqliteKyselyDB(props) {
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
  return db;
}
export {
  openSqliteKyselyDB
};
//# sourceMappingURL=index.mjs.map