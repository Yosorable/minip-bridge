import { Kysely, Migrator, MigratorProps } from "kysely";
import { MinipSqliteDatabase } from "./core/sqlite-database";
import { MinipSqliteDialect } from "./core/sqlite-dialect";

export interface MinipSqliteMigratorProps extends Omit<MigratorProps, "db"> {}

export interface OpenSqliteDBProps {
  path: string;
  debug?: boolean;
  migratorProps?: MinipSqliteMigratorProps;
}

export interface OpenSqliteDBWithMigrationProps extends OpenSqliteDBProps {}

export function openSqliteDB<T>(props: {
  path: string;
  debug?: boolean;
}): Kysely<T>;

export function openSqliteDB<T>(props: {
  path: string;
  debug?: boolean;
  migratorProps: MinipSqliteMigratorProps;
}): {
  db: Kysely<T>;
  migrator: Migrator;
};

export function openSqliteDB<T>(props: OpenSqliteDBProps) {
  const dialect = new MinipSqliteDialect({
    database: new MinipSqliteDatabase(props.path, props.debug ?? false),
  });
  const db = new Kysely<T>({
    dialect,
  });

  if (props.migratorProps) {
    const migrator = new Migrator({
      db,
      ...props.migratorProps,
    });
    return {
      db,
      migrator,
    };
  }

  return db;
}
