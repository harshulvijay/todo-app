import { Component, h } from '@stencil/core';
import { onThemeChange, ThemeStore } from '../../global/states/theme';
import { Themes } from '../../global/themes';
import { waitFor } from '../../global/utils';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.less',
  shadow: true,
})
export class AppRoot {
  /**
   * The element on which background styles are applied
   */
  bgElem: HTMLDivElement;

  componentWillLoad() {
    onThemeChange(`themeID`, async id => {
      if (+ThemeStore.currentTheme !== +id) {
        const { wallpaper } = Themes[+id];

        this.bgElem.style.opacity = '0';
        await waitFor(250);
        this.bgElem.style.setProperty(`--app-bg`, `url('${wallpaper}')`);
        await waitFor(250);
        this.bgElem.style.opacity = '1';

        ThemeStore.currentTheme = [+id];
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
          <div class="background" ref={elem => (this.bgElem = elem)} />
          <div class="under" />
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
