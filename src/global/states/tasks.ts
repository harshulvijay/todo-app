import { createStore } from '@stencil/store';
import { Task } from '../interfaces/task';
import { getTaskIDs, readTask } from '../db.worker';

type TasksObject = {
  tasks: {
    [key: string]: Task;
  };
};

const load = async () => {
  const data: { [key: string]: Task } = {};
  const ids = await getTaskIDs();
  for await (const taskID of ids) {
    const list = await readTask(taskID as string);
    data[list.meta._id] = list;
  }
  return data;
};

const { state, onChange } = createStore<TasksObject>({
  tasks: {},
});

// Load the data that's already stored in IndexedDB into memory
void (async function () {
  state.tasks = await load();
})();

export { state as TasksStore, onChange as onTaskStoreChange };
