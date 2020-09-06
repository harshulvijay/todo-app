import { createStore } from '@stencil/store';
import { List } from '../interfaces/list';
import { getListIDs, readList } from '../db.worker';

type ListsObject = {
  lists: {
    [key: string]: List;
  };
  currentList: string;
};

const load = async () => {
  const data: { [key: string]: List } = {};
  const ids = await getListIDs();
  for await (const listID of ids) {
    const list = await readList(listID as string);
    data[list.meta._id] = list;
  }
  return data;
};

const { state, onChange } = createStore<ListsObject>({
  lists: {},
  currentList: '',
});

// Load the data that's already stored in IndexedDB into memory
void (async function () {
  state.lists = await load();
})();

export { state as ListStore, onChange as onListsStoreChange };
