import { Component, h } from '@stencil/core';
import { onThemeChange, ThemeStore } from '../../global/states/theme';
import { Themes } from '../../global/themes';
import { waitFor } from '../../global/utils';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: true,
})
export class AppRoot {
  bg: HTMLDivElement;

  componentWillLoad() {
    onThemeChange(`themeID`, async id => {
      if (+ThemeStore.currentTheme !== +id) {
        this.bg.style.opacity = '0';
        await waitFor(150);
        const { wallpaper } = Themes[+id];
        this.bg.style.setProperty(`--app-bg`, `url('${wallpaper}')`);
        ThemeStore.currentTheme = [+id];
        await waitFor(150);
        this.bg.style.opacity = '1';
      }
    });
  }

  componentDidLoad() {
    ThemeStore.themeID = [1];
  }

  render() {
    return (
      <div class="content">
        <div class="nav">
          <app-nav></app-nav>
        </div>
        <main>
          <div class="background" ref={bg => (this.bg = bg)} />
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route
                url="/:listID"
                component="list-viewer"
                exact={true}
              />
              <stencil-route url="/:listID/:taskID" component="task-viewer" />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
