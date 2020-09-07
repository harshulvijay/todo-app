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
      } else {
        console.error(`Error: List with ID '${listID}' not found`);
        this.redirectToHome = true;
      }
    }
  }

  async componentWillLoad() {
    await this.loadList();
    ListStore.currentList = this.match.params.listID;
  }

  async componentWillUpdate() {
    await this.loadList();
    ListStore.currentList = this.match.params.listID;
  }

  componentDidLoad() {
    this.titleEl.onkeypress = evt => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        const targetEl = evt.target as HTMLDivElement;
        targetEl.blur();
      }
    };

    this.titleEl.onblur = evt => {
      const targetEl = evt.target as HTMLDivElement;
      this.changeListTitle(targetEl.innerText);
    };
  }

  private async changeListTitle(newTitle: string) {
    const {
      meta: { _id: id, title: oldTitle },
    } = this.list;
    if (newTitle !== oldTitle) {
      ListStore.lists[id].meta.title = newTitle;
      await insertList(ListStore.lists[id]);
      ListStore.lists = { ...ListStore.lists };
    }
  }

  render() {
    ThemeStore.themeID = [this.list.meta.theme];
    if (!this.redirectToHome) {
      const { meta } = this.list;
      return (
        <Host>
          <div contentEditable class="heading" ref={el => (this.titleEl = el)}>
            {meta.title}
            <br />
          </div>
          <div class="bottom">
            <input type="text" />
          </div>
        </Host>
      );
    }
    return this.redirectToHome && <stencil-router-redirect url="/" />;
  }
}
