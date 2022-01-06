import {enablePromise, SQLiteDatabase} from 'react-native-sqlite-storage';
import {Card} from '../services/api/card';

enablePromise(true);

export const addCards = async (db: SQLiteDatabase, cards: Card[]) => {
  // create table if not exists
  const query =
    'INSERT OR REPLACE INTO cards value ' +
    cards.map((card) => `(${card.id}, '${card.code}', '${card.name}')`);

  await db.executeSql(query);
};
