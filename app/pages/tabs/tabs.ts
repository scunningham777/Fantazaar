import {Page} from 'ionic-angular';
import {ItemListPage} from '../item-list-page/item-list-page';
import {Page2} from '../page2/page2';
import {Page3} from '../page3/page3';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ItemListPage;
  tab2Root: any = Page2;
  tab3Root: any = Page3;
}
