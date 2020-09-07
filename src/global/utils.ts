/**
 * Utility functions
 */

import { Task, _TaskMeta, TaskDetails } from './interfaces/task';
import { List, _ListMeta } from './interfaces/list';
import { nanoid } from 'nanoid/async';
import { _ThemeMeta, Theme } from './themes';

/**
 * Generates an ID using `Date.now()` and `Math.random()`
 *
 * @returns {string} The generated ID
 * @deprecated Use `nanoid` instead
 */
export const generateId = (): string => {
  /* return `_${Date.now().toString(36) + Math.random().toString(32).substr(2, 9)}`; */
  // a random integer
  const randomInt: number = parseInt((Date.now() * Math.random()).toFixed(0));
  return randomInt.toString(32);
};

/**
 * Waits for `n ms` before resuming
 *
 * @param {number} n The time (in milliseconds) to wait for
 */
export const waitFor = async (n: number): Promise<Function> => {
  return new Promise(resolve => setTimeout(resolve, n));
};

// deprecated: use for...of instead
export const runAsyncFnOnArray = async <T = any>(
  array: Array<T>,
  fn: (promise: T) => Promise<any> = async p => p,
): Promise<Array<T>> => {
  const promise: Promise<Array<T>> = new Promise(resolve => {
    const arrayNew = [];
    array.map(async (value, index) => {
      const item = await fn(value);
      arrayNew.push(item);
      index === array.length - 1 && resolve(arrayNew);
    });
  });
  return promise;
};

/**
 * Creates a new `Task`
 *
 * @param {string} title The name of the task
 * @param {string} parent The ID of the parent `List`
 */
export const createTask = async (
  details: TaskDetails,
  parent: string,
): Promise<Task> => {
  const date = new Date();
  const { completed, note, title, dueDate } = details;
  const _meta = {
    _id: await nanoid(),
    date,
    dueDate,
  };
  // Freeze the `_meta` object
  Object.freeze(_meta);
  const meta: _TaskMeta = {
    ..._meta,
    title,
    parent,
  };
  const task: Task = {
    meta,
    completed,
    note,
  };
  return task;
};

/**
 * Creates a new `List`
 *
 * @param {string} title The name of the list
 * @param {string[]} _tasks The IDs of the tasks stored in the list
 */
export const createList = async (
  title: string,
  theme: number = 0,
  index: number = -1,
  ..._tasks: string[]
): Promise<List> => {
  const date = new Date();
  const tasks: Set<string> = new Set<string>(..._tasks);
  const _meta = {
    _id: await nanoid(),
    date,
  };
  // Freeze the `_meta` object
  Object.freeze(_meta);
  const meta: _ListMeta = {
    ..._meta,
    index,
    theme,
    title,
  };
  const list: List = {
    meta,
    tasks,
  };
  return list;
};

/**
 * Creates a new `Theme`
 *
 * @param {string} colors The colors for the theme
 * @param {string} wp A wallpaper for the theme
 */
export const createTheme = (
  colors: {
    /**
     * The primary color
     */
    primary: string;

    /**
     * The secondary color
     */
    secondary: string;
  },
  wp: string = null,
) => {
  const meta: _ThemeMeta = {
    _id: null,
  };
  const theme: Theme = {
    meta,
    colors,
    wallpaper: wp,
  };
  return theme;
};
