export interface _ListMeta {
  _id: string;

  date: Date;

  index: number;

  theme: number;

  title: string;
}

export interface List {
  meta: _ListMeta;

  /**
   * An array that stores the IDs of the individual tasks
   */
  tasks: Set<string>;
}
