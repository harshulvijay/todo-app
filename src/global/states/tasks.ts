import { createStore } from '@stencil/store';
import { Task } from '../interfaces/task';

type TasksObject = {
  tasks: {
    [key: string]: Task;
  };
};

/* const { state } = createStore<TasksObject>({
  tasks: {},
}); */

export const taskStore = createStore<TasksObject>({
  tasks: {},
});
export const taskState = taskStore.state;
