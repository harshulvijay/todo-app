import { Component, Host, h, State, Prop } from '@stencil/core';
import { List } from '../../global/interfaces/list';
import { MatchResults } from '@stencil/router';
import { ListStore } from '../../global/states/lists';
import { readList, insertList } from '../../global/db.worker';
import { ThemeStore } from '../../global/states/theme';

@Component({
  tag: 'list-viewer',
  styleUrl: 'list-viewer.scss',
  shadow: true,
})
export class ListViewer {
  titleEl: HTMLDivElement;
  @Prop() match: MatchResults;
  @State() list: List;
  @State() redirectToHome: boolean = false;

  private async loadList() {
    const listID = this.match.params.listID;
    if (listID) {
      const list = await readList(listID);
      if (list) {
        this.list = list;
        ThemeStore.themeID = [list.meta.theme];
      } else {
        console.error(`Error: List with ID '${listID}' not found`);
        this.redirectToHome = true;
      }
    }
  }

  async componentWillLoad() {
    await this.loadList();
    ListStore.currentList = this.match.params.listID;
    /* ThemeStore.themeID = +this.list.meta.index + 0; */
  }

  async componentWillUpdate() {
    await this.loadList();
    ListStore.currentList = this.match.params.listID;
  }

  componentDidLoad() {
    this.titleEl.onkeypress = e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const targetEl = e.target as HTMLDivElement;
        targetEl.blur();
      }
    };

    this.titleEl.onblur = e => {
      const targetEl = e.target as HTMLDivElement;
      this.changeListTitle(targetEl.innerText);
    };
  }

  private async changeListTitle(newTitle: string) {
    const {
      meta: { _id: id, title: oldTitle },
    } = this.list;
    if (newTitle !== oldTitle) {
      console.log('changed');
      ListStore.lists[id].meta.title = newTitle;
      await insertList(ListStore.lists[id]);
      ListStore.lists = { ...ListStore.lists };
    }
  }

  render() {
    return (
      <Host>
        <div contentEditable class="heading" ref={el => (this.titleEl = el)}>
          {this.list?.meta.title}
        </div>
        <div class="bottom">
          <input type="text" />
        </div>
        {(() => {
          return this.redirectToHome && <stencil-router-redirect url="/" />;
        })()}
      </Host>
    );
  }
}
