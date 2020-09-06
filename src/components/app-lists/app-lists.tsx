import { Component, h, State } from '@stencil/core';
import { onListsStoreChange, ListStore } from '../../global/states/lists';
import { List } from '../../global/interfaces/list';
import { removeList } from '../../global/db.worker';

@Component({
  tag: 'app-lists',
  styleUrl: 'app-lists.scss',
})
export class AppLists {
  @State() listsEl = [];
  @State() redirectToHome = false;

  componentWillLoad() {
    this.fetchListsAsElementsByID(ListStore.lists);
    onListsStoreChange(`lists`, ids => this.fetchListsAsElementsByID(ids));
  }

  private getSortedList(
    listIDs: { [key: string]: List },
    property: 'date' | 'index' = 'index',
  ) {
    const lists: List[] = [];
    for (const listID in listIDs) {
      // fetch the list
      const list = ListStore.lists[listID];
      lists.push(list);
    }
    lists.sort(
      (a, b) => a.meta[property].valueOf() - b.meta[property].valueOf(),
    );
    return lists;
  }

  private fetchListsAsElementsByID(listIDs: { [key: string]: List }) {
    const elements = [];
    const lists = this.getSortedList(listIDs, 'date');
    lists.map(list => elements.push(this.createListElement(list)));
    /* // sort by creation date
    elements.sort((prev: HTMLDivElement, curr: HTMLDivElement) => {
      if (prev && curr) {
        console.log(prev.dataset, curr.dataset)
        /* console.log(prev.dataset, curr.dataset)
        const prevDate = new Date(prev.dataset.cdate);
        const currDate = new Date(curr.dataset.cdate);
        if (prevDate.valueOf() < currDate.valueOf()) return -1;
        if (prevDate.valueOf() === currDate.valueOf()) return 0;
        return 1; * /
      }
      return 1;
    }); */
    this.listsEl = elements;
  }

  private createListElement(list: List): Promise<HTMLOListElement> {
    const {
      meta: { _id: id, index, date, title },
    } = list;
    const el = (
      <li data-cdate={date.valueOf()} data-id={id} data-index={index}>
        <app-item>
          <stencil-route-link url={`/${id}`} exact={true}>
            <div slot="">{title}</div>
          </stencil-route-link>
          <span slot="actions">
            <button onClick={async () => await this.deleteList(id)}>X</button>
          </span>
        </app-item>
      </li>
    );
    return el;
  }

  private async deleteList(id: string) {
    delete ListStore.lists[id];
    await removeList(id);
    // trigger change in the store
    ListStore.lists = { ...ListStore.lists };
    ListStore.currentList === id && (this.redirectToHome = true);
  }

  render() {
    return (
      <div>
        <ul>{this.listsEl}</ul>
        {(() => {
          return this.redirectToHome && <stencil-router-redirect url="/" />;
        })()}
      </div>
    );
  }
}
