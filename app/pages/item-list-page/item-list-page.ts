import {Component} from '@angular/core';
import {Modal} from 'ionic-angular';
import {NavController} from 'ionic-angular';
import {ValuesPipe} from '../../utils/values.pipe';
import {ItemDetailsPage} from '../item-details-page/item-details-page';
import {ItemsService, Item} from '../../providers/items-service/items-service';
import {InventoryService, InventoryEntry} from '../../providers/inventory-service/inventory-service';
import {EditItemOwnedModalPage} from '../edit-item-owned-modal/edit-item-owned-modal';
import {EditItemSoldModalPage} from '../edit-item-sold-modal/edit-item-sold-modal';

@Component({
  pipes: [ValuesPipe],
  templateUrl: 'build/pages/item-list-page/item-list-page.html'
})
export class ItemListPage {
  items: Promise<Item[]>;
  inventory: Promise<any>;
  fullItems: ItemWithCounts[];

  constructor(
    private _nav: NavController, 
    private _itemsService: ItemsService, 
    private _inventoryService: InventoryService
  ) {}

  ngOnInit() {
    this._initFullItems();
    
  }

  showItemDetails(item: Item) {
    this._nav.push(ItemDetailsPage, { 'selectedItemId': item._id });
  }
 
  editItemOwnedCount(item: ItemWithCounts) {
    let editItemOwnedCountModal = Modal.create(EditItemOwnedModalPage, {item: item});
    editItemOwnedCountModal.onDismiss(data => {
      if (!data) {
        //user cancelled the dialog
        return;
      }
      item.numberOwned = data.newCount;
      this._inventoryService.setItemOwnedCount(data.itemName, data.newCount);
    })
    this._nav.present(editItemOwnedCountModal);
  }
  
  editItemSoldCount(item: ItemWithCounts) {
    let editItemSoldCountModal = Modal.create(EditItemSoldModalPage, {item: item});
    editItemSoldCountModal.onDismiss(data => {
      if (!data) {
        //user cancelled the dialog
        return;
      }
      item.numberSold = data.newCount;
      this._inventoryService.setItemSoldCount(data.itemName, data.newCount);
    })
    this._nav.present(editItemSoldCountModal);
  }

  incrementItemOwnedCount(item: ItemWithCounts): void {
    this._inventoryService.setItemOwnedCount(item.name, ++item.numberOwned);    
  }

  transferCountFromOwnedToSold(item: ItemWithCounts, countTransferred: number): void {
    if (item.numberOwned < countTransferred) {
      countTransferred = item.numberOwned;
    }
   
    item.numberOwned = item.numberOwned - countTransferred;
    item.numberSold = +(item.numberSold) + +countTransferred;
    
    this._inventoryService.setItemOwnedCount(item.name, item.numberOwned);
    this._inventoryService.setItemSoldCount(item.name, item.numberSold);    
  }
  
  _initFullItems(): void {
    this.items = this._itemsService.getAllItems();
    this.inventory = this._inventoryService.getInventory();
    let promiseArray: [Promise<Item[]>, Promise<InventoryEntry[]>] = [this.items, this.inventory];
    Promise.all(promiseArray)
      .then((results: any[]) => {
        let itemList = results[0];
        let inventory = results[1];
        
        for (let item of itemList) {
          if (inventory[item.name]) {
            item.numberOwned = inventory[item.name].numberOwned || 0;
            item.numberSold = inventory[item.name].numberSold || 0;
          } else {
            item.numberOwned = 0;
            item.numberSold = 0;
          }
        }
        
        this.fullItems = itemList;
      });
  }
}

export interface ItemWithCounts extends Item{
  numberOwned: number,
  numberSold: number
}