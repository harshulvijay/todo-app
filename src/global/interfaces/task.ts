export interface _TaskMeta {
  _id: string;

  /**
   * Creation date of the task
   */
  date: Date;

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
}

export interface Task {
  meta: _TaskMeta;

  /**
   * Has the task been completed?
   */
  completed: boolean;

  note: string;
};
