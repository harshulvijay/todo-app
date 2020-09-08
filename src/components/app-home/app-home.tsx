import { Component, Host, h } from '@stencil/core';
import { createList } from '../../global/utils';
import { insertList } from '../../global/db.worker';
import { ListStore } from '../../global/states/lists';
import { ThemeStore } from '../../global/states/theme';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.less',
  scoped: true,
})
export class AppHome {
  input: HTMLInputElement;

  componentDidLoad() {
    this.input.onkeydown = async (evt: KeyboardEvent) => {
      evt.key === 'Enter' && await this.addList(this.input.value);
    };
  }

  async addList(title: string): Promise<void> {
    const index = Object.keys(ListStore.lists).length;
    const list = await createList(title, 0, index);
    await insertList(list);
    ListStore.lists[list.meta._id] = list;
    ListStore.lists = { ...ListStore.lists };
  }

  render() {
    ThemeStore.themeID = [1];
    return (
      <Host>
        <input type="text" ref={el => (this.input = el)} />
        <app-lists />
      </Host>
    );
  }

}
