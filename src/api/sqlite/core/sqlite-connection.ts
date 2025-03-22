import {
  CompiledQuery,
  DatabaseConnection,
  QueryResult,
  SelectQueryNode,
} from "kysely";
import { MinipSqliteDatabase } from "./sqlite-database";

export class MinipSqliteConnection implements DatabaseConnection {
  readonly #db: MinipSqliteDatabase;

  constructor(db: MinipSqliteDatabase) {
    this.#db = db;
  }
  async executeQuery<R>(compiledQuery: CompiledQuery): Promise<QueryResult<R>> {
    const { sql, parameters } = compiledQuery;
    if (this.#db.debug) {
      console.debug(sql, parameters);
    }
    const stmt = await this.#db.prepare(sql);

    if (stmt.reader) {
      return {
        rows: (await stmt.all(parameters)) as R[],
      };
    } else {
      const { changes, lastInsertRowid } = await stmt.run(parameters);

      const numAffectedRows =
        changes !== undefined && changes !== null ? BigInt(changes) : undefined;

      return {
        numUpdatedOrDeletedRows: numAffectedRows,
        numAffectedRows,
        insertId:
          lastInsertRowid !== undefined && lastInsertRowid !== null
            ? BigInt(lastInsertRowid)
            : undefined,
        rows: [],
      };
    }
  }
  async *streamQuery<R>(
    compiledQuery: CompiledQuery,
    _chunkSize: number,
  ): AsyncIterableIterator<QueryResult<R>> {
    const { sql, parameters, query } = compiledQuery;
    const stmt = await this.#db.prepare(sql);
    if (SelectQueryNode.is(query)) {
      const iter = stmt.iterate(parameters) as AsyncIterableIterator<R>;
      for await (const row of iter) {
        yield {
          rows: [row],
        };
      }
    } else {
      throw new Error(
        "Sqlite driver only supports streaming of select queries",
      );
    }
  }
}
