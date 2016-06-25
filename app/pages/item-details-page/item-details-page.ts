import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ItemsService, Item, BasicItemSource} from '../../providers/items-service/items-service'

@Component({
    templateUrl: 'build/pages/item-details-page/item-details-page.html'
})

export class ItemDetailsPage {
  item: Item;
  hasBasicSources: boolean;
  hasBazaarSources: boolean;
  basicSources: BasicItemSource[];
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
        this.hasBasicSources = this._hasBasicSources();
        this.hasBazaarSources = this._hasBazaarSources();
        this.basicSources = this.item.basic_sources;
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
    return !!this.item.bazaar_sources;
  }
  
  _hasBasicSources(): boolean {
    return !!this.item.basic_sources;
  }
}