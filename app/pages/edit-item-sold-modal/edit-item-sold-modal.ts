import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {ItemsService} from '../../providers/items-service/items-service';
import {ItemWithCounts} from '../item-list-page/item-list-page';

@Component({
  templateUrl: 'build/pages/edit-item-sold-modal/edit-item-sold-modal.html',
})
export class EditItemSoldModalPage {
  itemName: string;
  itemSoldCount: number;

  constructor(
    private _itemsService: ItemsService, 
    private _viewCtrl: ViewController,
    private _params: NavParams
  ) {
		let item: ItemWithCounts = this._params.data.item;
    this.itemName = item.name;
    this.itemSoldCount = item.numberSold;
  }
  
  submit() {
    let data = {
      itemName: this.itemName,
      newCount: +(this.itemSoldCount)
    }
    this._viewCtrl.dismiss(data);
  }
}
