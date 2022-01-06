import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import createCardsTableMigration from './../migrations/create-cards-table';

enablePromise(true);

type migration = {
  name: string;
  run: (db: SQLiteDatabase) => Promise<void>;
};
const migrations: migration[] = [
  {name: 'toto', run: createCardsTableMigration},
  // {name: 'toto2', run: createCardsTableMigration},
];

export const getConnection = async () => {
  return openDatabase({name: 'fcc.db', location: 'default'});
};

const getMigrationVersion = async (): Promise<number> => {
  const db = await getConnection();
  const result = await db.executeSql(
    'SELECT COUNT(name) as version from migrations;',
  );
  console.log('migration version', result[0].rows.item(0).version);
  return result[0].rows.item(0).version;
};

const insertMigration = async (migration: migration) => {
  const db = await getConnection();
  console.log('insert migration', migration.name);
  await db.executeSql(
    `INSERT INTO migrations (name) VALUES ('${migration.name}');`,
  );
};

const initSchema = async () => {
  console.log('init schema');
  const db = await getConnection();
  // await db.executeSql('DROP TABLE IF EXISTS migration;');
  // await db.executeSql('DROP TABLE IF EXISTS migrations;');
  // await db.executeSql('DROP TABLE IF EXISTS cards;');
  await db.executeSql(
    'CREATE TABLE IF NOT EXISTS migrations ("name" VARCHAR(255) NOT NULL, "create_date" DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL);',
  );
  await db.executeSql(
    'CREATE INDEX IF NOT EXISTS name_idx ON migrations (name);',
  );
};

const migration = async () => {
  console.log('migration');
  const db = await getConnection();
  const migrationVersion = await getMigrationVersion();
  const newMigrationVersion = migrations.length;
  if (migrationVersion < newMigrationVersion) {
    await Promise.all(
      migrations
        .splice(migrationVersion)
        .map(async (currentMigration: migration) => {
          console.log('run migration', currentMigration.name);
          await currentMigration.run(db);
          await insertMigration(currentMigration);
        }),
    );
  } else {
    console.log('no new migration found');
  }
};

export const initDb = async () => {
  try {
    await initSchema();
    await migration();
  } catch (error) {
    console.log(error);
  }
};
