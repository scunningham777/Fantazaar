import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {ItemsService, Item} from '../../providers/items-service/items-service';

@Component({
  templateUrl: 'build/pages/edit-item-owned-modal/edit-item-owned-modal.html',
})
export class EditItemOwnedModalPage {
  itemName: string;
  itemOwnedCount: number;

  constructor(
    private _itemsService: ItemsService, 
    private _viewCtrl: ViewController,
    private _params: NavParams
  ) {
		let item = this._params.data.item;
    this.itemName = item.name;
    this.itemOwnedCount = item.numberOwned;
  }
  
  submit() {
    let data = {
      itemName: this.itemName,
      newCount: +(this.itemOwnedCount)
    }
    this._viewCtrl.dismiss(data);
  }
}
