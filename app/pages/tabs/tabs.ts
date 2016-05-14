import {Type} from 'angular2/core';
import {Page} from 'ionic-angular';
import {ItemListPage} from '../item-list-page/item-list-page';
import {ItemRecipePage} from '../item-recipe-page/item-recipe-page';
import {SettingsPage} from '../settings-page/settings-page';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tabs: Array<{root: Type, name: string, icon: string}> = [
    {root: ItemListPage, name: "Full Inventory", icon: "list"},
    {root: ItemRecipePage, name: "Item Recipe", icon: "flask"},
    {root: SettingsPage, name: "Settings", icon: "cog"}
  ]
}
