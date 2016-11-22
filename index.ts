import * as ko from "knockout";
import * as Menu from "folke-menu";

class MenuButtonComponent {
    public title: KnockoutObservable<string>;
    public action: () => void;
    constructor(params:Menu.MenuButton) {
        this.title = params.title;
        this.action = params.action;
    }
}

class MenuRouteButtonComponent {
    public title: KnockoutObservable<string>;
    public link: string;
    constructor(params: Menu.MenuRouteButton) {
        this.title = params.title;
        this.link = '#' + params.route;
    }
}

class SubMenuComponent {
    public menu: KnockoutObservableArray<Menu.MenuItem>;
    public collapsed: KnockoutObservable<boolean>;
    public title: KnockoutObservable<string> | null;
    constructor(params: Menu.SubMenu) {
        this.menu = params.menu;
        this.collapsed = params.collapsed;
        this.title = params.title;
    }
    public toggle = () => this.collapsed(!this.collapsed());
}

export function register() {
    ko.components.register('folke-menu', {
        template: `<header data-bind="css: { collapsed: collapsed }"><span class="fa fa-bars" data-bind="click: action"></span><span class="title" data-bind="text: title"></span></header>
<ul data-bind="foreach: menu, css: { collapsed: collapsed }">
<li data-bind="visible: visible, component: { name: component, params: $data }, css: component"></li>
</ul>`,
        viewModel: { instance: Menu.default }
    });

    ko.components.register('folke-menu-button', {
        template: `<button data-bind="text: title, click: action"></button>`,
        viewModel: MenuButtonComponent
    });

    ko.components.register('folke-menu-route-button', {
        template: `<a data-bind="text: title, attr: { href: link }"></span>`,
        viewModel: MenuRouteButtonComponent
    });

    ko.components.register('folke-submenu', {
        template: `<div class="submenu"><button data-bind="click:toggle, text: title"></button><!-- ko ifnot: collapsed --><ul data-bind="foreach: menu">
<li data-bind="visible: visible, component: { name: component, params: $data }, css: component"></li>
</ul><!-- /ko --></div>`,
        viewModel: SubMenuComponent
    });
}
