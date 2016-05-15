import {Page, NavParams, ViewController} from 'ionic-angular';
import {ItemsService, Item} from '../../providers/items-service/items-service';

@Page({
  templateUrl: 'build/pages/edit-item-number-modal/edit-item-number-modal.html',
})
export class EditItemNumberModalPage {
  item: Item;

  constructor(
    private _itemsService: ItemsService, 
    private _viewCtrl: ViewController,
    private _params: NavParams
  ) {
		this.item = this._params.data.item;
  }
  
  submit() {
    let data = {
      item_id: this.item._id,
      numberOwned: this.item.numberOwned
    }
    this._viewCtrl.dismiss(data);
  }
}
