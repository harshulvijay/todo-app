import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'task-viewer',
  styleUrl: 'task-viewer.less',
  scoped: true,
})
export class TaskViewer {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
