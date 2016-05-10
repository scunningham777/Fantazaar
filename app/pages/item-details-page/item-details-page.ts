import {Page, NavController, NavParams} from 'ionic-angular';
import {ItemsService} from '../../providers/items-service/items-service'

@Page({
    templateUrl: 'build/pages/item-details-page/item-details-page.html'
})

export class ItemDetailsPage {
  nav:NavController;
  params: NavParams;
  itemsService: ItemsService;
  item;
  hasStringSources;
  hasBazaarSources;
  stringSources;
  bazaarSources;
  
  constructor(nav:NavController, params: NavParams, itemsService: ItemsService) {
    this.nav = nav;
    this.params = params;
    this.itemsService = itemsService;
  }
  
  onPageWillEnter(){
		this.item = this.itemsService.getItemByName(this.params.data.selectedItem);
    this.hasStringSources = ItemDetailsPage._hasStringSources(this.item);
    this.hasBazaarSources = ItemDetailsPage._hasBazaarSources(this.item);
    this.stringSources = this.hasStringSources?this.item.sources.filter(ItemDetailsPage._isString):[];
    this.bazaarSources = this.hasBazaarSources?this.item.sources.filter(Array.isArray)[0]:[];
	}
  
  showItemDetails(itemName) {
    this.nav.push(ItemDetailsPage, {'selectedItem': itemName});
  }
  
  static _hasBazaarSources(item) {
    return item.sources.some(Array.isArray);
  }
  
  static _hasStringSources(item) {
    return item.sources.some(ItemDetailsPage._isString);
  }
  
  static _isString(source) {
    return (typeof source === "string");
  }
}