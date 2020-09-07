export interface _TaskMeta {
  _id: string;

  /**
   * Creation date of the task
   */
  date: Date;

  dueDate: Date;

  /**
   * The ID of the parent `List` of the `Task`
   */
  parent: string;

  title: string;
};

export interface TaskDetails {
  completed: boolean;

  note: string;

  title: string;

  dueDate: Date;
}

export interface Task {
  meta: _TaskMeta;

  /**
   * Has the task been completed?
   */
  completed: boolean;

  note: string;
};
