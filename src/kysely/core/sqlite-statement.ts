export interface MinipSqliteStatement {
  readonly reader: boolean;
  all(parameters: ReadonlyArray<unknown>): Promise<unknown[]>;
  run(parameters: ReadonlyArray<unknown>): Promise<{
    changes: number | bigint;
    lastInsertRowid: number | bigint;
  }>;
  iterate(parameters: ReadonlyArray<unknown>): AsyncIterableIterator<unknown>;
}
