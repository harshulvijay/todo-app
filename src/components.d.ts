/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { MatchResults } from "@stencil/router";
export namespace Components {
    interface AppHome {
    }
    interface AppInput {
    }
    interface AppItem {
    }
    interface AppLists {
    }
    interface AppNav {
    }
    interface AppRoot {
    }
    interface ListViewer {
        "match": MatchResults;
    }
    interface TaskViewer {
    }
}
declare global {
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {
    }
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppInputElement extends Components.AppInput, HTMLStencilElement {
    }
    var HTMLAppInputElement: {
        prototype: HTMLAppInputElement;
        new (): HTMLAppInputElement;
    };
    interface HTMLAppItemElement extends Components.AppItem, HTMLStencilElement {
    }
    var HTMLAppItemElement: {
        prototype: HTMLAppItemElement;
        new (): HTMLAppItemElement;
    };
    interface HTMLAppListsElement extends Components.AppLists, HTMLStencilElement {
    }
    var HTMLAppListsElement: {
        prototype: HTMLAppListsElement;
        new (): HTMLAppListsElement;
    };
    interface HTMLAppNavElement extends Components.AppNav, HTMLStencilElement {
    }
    var HTMLAppNavElement: {
        prototype: HTMLAppNavElement;
        new (): HTMLAppNavElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLListViewerElement extends Components.ListViewer, HTMLStencilElement {
    }
    var HTMLListViewerElement: {
        prototype: HTMLListViewerElement;
        new (): HTMLListViewerElement;
    };
    interface HTMLTaskViewerElement extends Components.TaskViewer, HTMLStencilElement {
    }
    var HTMLTaskViewerElement: {
        prototype: HTMLTaskViewerElement;
        new (): HTMLTaskViewerElement;
    };
    interface HTMLElementTagNameMap {
        "app-home": HTMLAppHomeElement;
        "app-input": HTMLAppInputElement;
        "app-item": HTMLAppItemElement;
        "app-lists": HTMLAppListsElement;
        "app-nav": HTMLAppNavElement;
        "app-root": HTMLAppRootElement;
        "list-viewer": HTMLListViewerElement;
        "task-viewer": HTMLTaskViewerElement;
    }
}
declare namespace LocalJSX {
    interface AppHome {
    }
    interface AppInput {
    }
    interface AppItem {
    }
    interface AppLists {
    }
    interface AppNav {
    }
    interface AppRoot {
    }
    interface ListViewer {
        "match"?: MatchResults;
    }
    interface TaskViewer {
    }
    interface IntrinsicElements {
        "app-home": AppHome;
        "app-input": AppInput;
        "app-item": AppItem;
        "app-lists": AppLists;
        "app-nav": AppNav;
        "app-root": AppRoot;
        "list-viewer": ListViewer;
        "task-viewer": TaskViewer;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-input": LocalJSX.AppInput & JSXBase.HTMLAttributes<HTMLAppInputElement>;
            "app-item": LocalJSX.AppItem & JSXBase.HTMLAttributes<HTMLAppItemElement>;
            "app-lists": LocalJSX.AppLists & JSXBase.HTMLAttributes<HTMLAppListsElement>;
            "app-nav": LocalJSX.AppNav & JSXBase.HTMLAttributes<HTMLAppNavElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "list-viewer": LocalJSX.ListViewer & JSXBase.HTMLAttributes<HTMLListViewerElement>;
            "task-viewer": LocalJSX.TaskViewer & JSXBase.HTMLAttributes<HTMLTaskViewerElement>;
        }
    }
}
