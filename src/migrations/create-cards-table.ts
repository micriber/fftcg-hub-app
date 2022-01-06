import {SQLiteDatabase} from 'react-native-sqlite-storage';

export default async (db: SQLiteDatabase): Promise<void> => {
  console.log('migration create cards table');

  const cardsQuery = `CREATE TABLE IF NOT EXISTS "cards" (
    "id" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "element" VARCHAR(255) NOT NULL,
    "rarity" VARCHAR(255) NOT NULL,
    "cost" VARCHAR(255) NOT NULL,
    "power" VARCHAR(255) NOT NULL,
    "category1" VARCHAR(255) NOT NULL,
    "category2" VARCHAR(255) NOT NULL,
    "multicard" VARCHAR(255) NOT NULL,
    "exBurst" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "job" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "set" VARCHAR(255) NOT NULL
  );`;

  await db.executeSql(cardsQuery);
};
