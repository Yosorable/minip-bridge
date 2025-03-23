import {
  sqliteCreateIterator,
  sqliteIteratorNext,
  sqliteIteratorRelease,
} from "../../api/sqlite";

export class MinipSQLiteQueryIterator
  implements AsyncIterableIterator<unknown>
{
  readonly dbKey: number;
  readonly stmtKey: number;
  readonly parameters: ReadonlyArray<unknown>;
  created: boolean = false;

  constructor(
    dbKey: number,
    stmtKey: number,
    parameters: ReadonlyArray<unknown>,
  ) {
    this.dbKey = dbKey;
    this.stmtKey = stmtKey;
    this.parameters = parameters;
  }

  public async next(): Promise<IteratorResult<unknown>> {
    if (!this.created) {
      await sqliteCreateIterator(this.dbKey, this.stmtKey, this.parameters);
      this.created = true;
    }
    const res = await sqliteIteratorNext(this.dbKey, this.stmtKey);
    if (res.hasData()) return { value: res.data, done: false };
    return { value: undefined, done: true };
  }

  public async return(): Promise<IteratorResult<unknown>> {
    if (this.created) {
      await sqliteIteratorRelease(this.dbKey, this.stmtKey);
    }
    return { value: undefined, done: true };
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<unknown> {
    return this;
  }
}
