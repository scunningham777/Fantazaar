import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ItemsService, Item} from '../../providers/items-service/items-service'

@Component({
    templateUrl: 'build/pages/item-details-page/item-details-page.html'
})

export class ItemDetailsPage {
  item: Item;
  hasStringSources: boolean;
  hasBazaarSources: boolean;
  stringSources: string[];
  bazaarSources: Promise<any[]>;
  
  constructor(
    private _nav: NavController, 
    private _params: NavParams, 
    private _itemsService: ItemsService
  ) {
  }
  
  ionViewWillEnter(){
		this._itemsService.getItemById(this._params.data.selectedItemId)
      .then((item: Item) => {
        this.item = item;
        this.hasStringSources = this._hasStringSources();
        this.hasBazaarSources = this._hasBazaarSources();
        this.stringSources = this.hasStringSources?this.item.sources.filter(ItemDetailsPage._isString):[];
        this._initBazaarSources();
      });
	}
  
  showItemDetails(itemName): void {
    this._nav.push(ItemDetailsPage, {'selectedItemId': itemName});
  }
  
  _initBazaarSources(): void {
    if (this.hasBazaarSources) {
      this.bazaarSources = this._itemsService.getItemSourceList(this.item)
        // .then((result) => {
        //   debugger;
        //   return result;
        // })
    }
  }
  
  _hasBazaarSources(): boolean {
    return this.item.sources.some(Array.isArray);
  }
  
  _hasStringSources(): boolean {
    return this.item.sources.some(ItemDetailsPage._isString);
  }
  
  static _isString(source): boolean {
    return (typeof source === "string");
  }
}