import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-nav',
  styleUrl: 'app-nav.less',
})
export class AppNav {
  render() {
    return (
      <Host>
        <nav>
          <h1 title="The lists created by you appear below.">My Lists</h1>
          {/* <div class="text">
            The lists created by you appear below.
          </div> */}
          <div class="hr" />
          <div class="lists">
            <app-lists></app-lists>
          </div>
          <div class="hr" />
          <button>+ Create New</button>
        </nav>
      </Host>
    );
  }
}
