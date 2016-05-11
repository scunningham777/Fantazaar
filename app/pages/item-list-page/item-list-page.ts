import {Page} from 'ionic-angular';
import {NavController} from 'ionic-angular';
import {ValuesPipe} from '../../utils/values.pipe';
import {ItemDetailsPage} from '../item-details-page/item-details-page';
import {ItemsService, Item} from '../../providers/items-service/items-service';
import {InventoryService, InventoryEntry} from '../../providers/inventory-service/inventory-service';

@Page({
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

  onPageWillEnter() {
    this._initFullItems();
    
  }

  showItemDetails(item: Item) {
    this._nav.push(ItemDetailsPage, { 'selectedItemId': item._id });
  }
  
  // getItemOwnedCount(item: Item): Promise<number> {
  //   let numberOwnedPromise = new Promise((resolve, reject) => {
  //     this.inventory
  //       .then(inventory => {
  //         let numberOwned = 0;
  //         if (!!inventory[item.name]){
  //           numberOwned = inventory[item.name].numberOwned || 0;
  //         }
  //         resolve(numberOwned);
  //       })
  //   });
    
  //   return numberOwnedPromise;
  // }
  
  // getItemSoldCount(item: Item): Promise<number> {
  //   let numberSoldPromise = new Promise((resolve, reject) => {
  //     this.inventory
  //       .then(inventory => {
  //         let numberSold = 0;
  //         if (!!inventory[item.name]){
  //           numberSold = inventory[item.name].numberSold || 0;
  //         }
  //         resolve(numberSold);
  //       })
  //   });
    
  //   return numberSoldPromise;
  // }

  incrementItemOwnedCount(item: ItemWithCounts): void {
    this._inventoryService.setItemOwnedCount(item.name, ++item.numberOwned);    
  }

  transferCountFromOwnedToSold(item: ItemWithCounts, countTransferred: number): void {
    if (item.numberOwned < countTransferred) {
      countTransferred = item.numberOwned;
    }
   
    item.numberOwned -= countTransferred;
    item.numberSold += countTransferred;
    
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

interface ItemWithCounts extends Item{
  numberOwned: number,
  numberSold: number
}