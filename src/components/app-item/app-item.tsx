import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-item',
  styleUrl: 'app-item.less',
})
export class AppItem {
  x: HTMLDivElement;

  render() {
    return (
      <Host>
        <div
          class="item"
          ref={r => (this.x = r)}
          /* onClick={() => (this.x ? this.x.classList.add('active') : '')} */
        >
          <slot />
          <slot name="main" />
          <div class="spacing" />
          <slot name="actions" />
        </div>
      </Host>
    );
  }
}
