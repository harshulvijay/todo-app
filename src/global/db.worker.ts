/**
 * IndexedDB data storage helper functions
 */

import { get, set, Store, del, keys as _keys } from 'idb-keyval';
import { Task } from './interfaces/task';
import { List } from './interfaces/list';

type StoreNames = 'default' | ('lists' | 'listIDs') | 'tasks';

// Create the stores
const stores: {
  default: Store;
  lists: Store;
  listIDs: Store;
  tasks: Store;
} = {
  default: new Store('default'),
  lists: new Store('lists'),
  listIDs: new Store('listIDs'),
  tasks: new Store('tasks'),
};

// Generic functions

export const insert = async <T = any>(
  key: string,
  object: T,
  store: StoreNames = 'default',
): Promise<void> => await set(key, object, stores[store]);

export const keys = async (
  store: StoreNames = 'default',
): Promise<IDBArrayKey> => _keys(stores[store]);

export const read = async <T = any>(
  key: string,
  store: StoreNames = 'default',
): Promise<T> => get(key, stores[store]);

export const remove = async (
  key: string,
  store: StoreNames = 'default',
): Promise<void> => del(key, stores[store]);

// Type-specific functions
// `task`
export const insertTask = async (task: Task): Promise<string> => {
  const id: string = task.meta._id;
  const { parent } = task.meta;
  // check whether the parent list exists or not before inserting
  const list: boolean = await listExists(parent);
  if (!list) throw new Error(`List '${parent}' doesn't exist`);
  await insert<Task>(id, task, `tasks`);
  return id;
};

export const readTask = async (id: string): Promise<Task> => {
  const task: Promise<Task> = read<Task>(id, `tasks`);
  return task;
};

export const removeTask = async (id: string): Promise<string> => {
  await remove(id, `tasks`);
  return id;
};

// `list`
export const listExists = async (id: string): Promise<boolean> => {
  const result = await read<boolean>(id, `listIDs`);
  return !!result;
};

export const insertList = async (list: List): Promise<string> => {
  const id: string = list.meta._id;
  await insert<List>(id, list, `lists`);
  await insert<boolean>(id, true, `listIDs`);
  return id;
};

export const readList = async (id: string): Promise<List> => {
  const list: Promise<List> = read<List>(id, `lists`);
  return list;
};

export const getListIDs = async (): Promise<IDBArrayKey> => {
  const ids: Promise<IDBArrayKey> = keys(`listIDs`);
  return ids;
};

export const removeList = async (id: string): Promise<string> => {
  await remove(id, `lists`);
  await remove(id, `listIDs`);
  return id;
};
