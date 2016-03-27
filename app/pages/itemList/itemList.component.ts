import {Page} from 'ionic-angular';
import {NavController} from 'ionic-angular';
import {ValuesPipe} from '../../utils/values.pipe';
import {ItemDetailsComponent} from '../itemDetails/itemDetails.component';
import {ItemsService} from '../../items/items.service';


@Page({
  pipes: [ValuesPipe],
  template: `
    <ion-navbar *navbar>
        <ion-title>Fantazaar - All Items</ion-title>
    </ion-navbar>
    
    <ion-content class="layout-primary">
        <div class="layout-restrainWidth800">
            <div *ngFor="#item of items | values; #index=index" class="itemTile itemTile-bg{{index%7}}">
                <div class="itemTile_content" (click)="showItemDetails(item)">{{item.name}}</div>
                <div class="itemTile_buttonRow">
                    <div class="itemTile_button" (click)="incrementItemOwnedCount(item)">
                        <span class="itemTile_countText">{{inventory[item.name] ? (inventory[item.name].numberOwned || 0) : 0}}</span>
                        owned
                    </div>
                    <div class="itemTile_button" (click)="transferCountFromOwnedToSold(item, 1)">
                        <span class="itemTile_countText">{{inventory[item.name] ? (inventory[item.name].numberSold || 0) : 0}}</span>
                        sold
                    </div>
                </div>
            </div>
        </div>
     </ion-content>
  `
})
export class ItemListComponent {
  nav: NavController;
  itemsService: ItemsService;
  items;
  inventory;

  constructor(nav: NavController, itemsService: ItemsService) {
    this.nav = nav;
    this.itemsService = itemsService;
    this.inventory = {};
  }

  onPageWillEnter() {
    this.items = this.itemsService.getAllItems();
  }

  showItemDetails(item) {
    this.nav.push(ItemDetailsComponent, { 'selectedItem': item.name });
  }

  incrementItemOwnedCount(item) {
    this.modifyItemOwnedCount(item, 1);
  }

  modifyItemOwnedCount(item, countModifier: number) {
    if (!this._isValidItem(item)) {
      //do some kind of error handling
      return;
    }

    if (!this.inventory.hasOwnProperty(item.name)) {
      this._initAndAddInventoryItem(item.name);
    }

    let inventoryItem = this.inventory[item.name];
    inventoryItem.numberOwned += countModifier;

    this._persistInventoryUpdates();
  }

  modifyItemSoldCount(item, countModifier: number) {
    if (!this._isValidItem(item)) {
      //do some kind of error handling
      return;
    }

    if (!this.inventory.hasOwnProperty(item.name)) {
      this._initAndAddInventoryItem(item.name);
    }

    var inventoryItem = this.inventory[item.name];
    inventoryItem.numberSold += countModifier;

    this._persistInventoryUpdates();
  }

  transferCountFromOwnedToSold(item, countTransferred: number) {
    if (!this._isValidItem(item)) {
      return;
    }

    if (this.inventory[item.name].numberOwned < countTransferred) {
      countTransferred = this.inventory[item.name].numberOwned;
    }
    this.modifyItemOwnedCount(item, countTransferred * -1);
    this.modifyItemSoldCount(item, countTransferred);
  }

  _initAndAddInventoryItem(itemName: string) {
    this.inventory[itemName] = {
      'numberOwned': 0,
      'numberSold': 0
    };
  }

  _isValidItem(item) {
    return (item.name && this.items.hasOwnProperty(item.name + ""));
  }

  _persistInventoryUpdates() {
    return;
  }
}
