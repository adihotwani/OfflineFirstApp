import { createRxDatabase, addRxPlugin, RxCollection, RxDatabase } from 'rxdb';
import {
  getRxStorageSQLiteTrial,
  getSQLiteBasicsQuickSQLite
} from 'rxdb/plugins/storage-sqlite';
import { replicateCouchDB } from 'rxdb/plugins/replication-couchdb';
import { open } from 'react-native-quick-sqlite';
import { uuidv4 } from 'uuid';

// Type definitions
type BusinessDocType = {
  id: string;
  name: string;
};

type ArticleDocType = {
  id: string;
  name: string;
  qty: number;
  selling_price: number;
  business_id: string;
};

type Collections = {
  businesses: RxCollection<BusinessDocType>;
  articles: RxCollection<ArticleDocType>;
};

type Database = RxDatabase<Collections>;


addRxPlugin(require('rxdb/plugins/update'));

let database: Database;

export const initDB = async () => {
  // Initialize SQLite adapter
  // const SQLiteAdapter = SQLite({
  //   adapter: 'react-native-sqlite',
  //   sqlitePlugin: { openDatabase: open }
  // });

  

  const db = await createRxDatabase({
    name: 'offlinefirstdb',
    storage: getRxStorageSQLiteTrial({SqliteBasics: getSQLiteBasicsQuickSQLite(open)}),
    multiInstance: false,
  });

  // Create collections
  await db.addCollections({
    businesses: {
      schema: {
        title: 'business schema',
        version: 0,
        primaryKey: 'id',
        type: 'object',
        properties: {
          id: { type: 'string', maxLength: 100 },
          name: { type: 'string' }
        },
        required: ['id', 'name'],
      }
    },
    articles: {
      schema: {
        title: 'article schema',
        version: 0,
        primaryKey: 'id',
        type: 'object',
        properties: {
          id: { type: 'string', maxLength: 100 },
          name: { type: 'string' },
          qty: { type: 'number' },
          selling_price: { type: 'number' },
          business_id: { type: 'string', ref: 'businesses' }
        },
        required: ['id', 'name', 'qty', 'selling_price', 'business_id'],
      }
    }
  });

  database = db;
  return db;
};

export const syncWithCouchDB = async (couchDBUrl: string, dbName: string) => {
  const db = getDB();
  
  const replicationStates = {
    businesses: replicateCouchDB({
      collection: db.businesses,
      url: `${couchDBUrl}/${dbName}_businesses`,
      live: true,
      pull: {
        retry: true  
      },
      push: {
        retry: true
      }
    }),
    articles: replicateCouchDB({
      collection: db.articles,
      url: `${couchDBUrl}/${dbName}_articles`,
      live: true,
      pull: {
        retry: true
      },
      push: {
        retry: true
      }
    })
  };

  return replicationStates;
};

export const getDB = (): Database => {
  if (!database) throw new Error('Database not initialized');
  return database;
};

export const generateId = (): string => uuidv4();

// Helper functions for CRUD operations
export const createBusiness = async (name: string) => {
  const db = getDB();
  return db.businesses.insert({
    id: generateId(),
    name
  });
};

export const createArticle = async (
  name: string,
  qty: number,
  price: number,
  businessId: string
) => {
  const db = getDB();
  return db.articles.insert({
    id: generateId(),
    name,
    qty,
    selling_price: price,
    business_id: businessId
  });
};

export const getBusinesses = () => {
  const db = getDB();
  return db.businesses.find().exec();
};

export const getArticlesByBusiness = (businessId: string) => {
  const db = getDB();
  return db.articles.find({
    selector: { business_id: businessId }
  }).exec();
};