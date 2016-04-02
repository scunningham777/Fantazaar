import {ItemsService} from '../items/items.service'
import {Injectable} from 'angular2/core';
import {EntityManager} from '../EntityManager';

@Injectable()
export class InventoryService {
  private _inventory;
  private _itemsService: ItemsService;
  private _entityManager: EntityManager;
  private _tableName = "inventory";
  
  constructor(itemsService: ItemsService, entityManager: EntityManager) {
    this._itemsService = itemsService;
    this._entityManager = entityManager;
    
    this._initInventory();
  }
  
  getInventory() {
    var filteredPromise = new Promise((resolve, reject) => {
      this._entityManager.getTable(this._tableName)
        .then(inventory => {
          if (inventory == undefined) {
            this._inventory = {};
          } else {
            this._inventory = JSON.parse(inventory);
          }
          resolve(this._inventory);
       });
    });
    
    return filteredPromise; 
  }
  
  setItemOwnedCount(itemName: string, count: number) {
    if (!this._isValidItem(itemName)) {
      //do some kind of error handling
      return;
    }

    if (!this._inventory.hasOwnProperty(itemName)) {
      this._initAndAddInventoryItem(itemName);
    }

    this._inventory[itemName].numberOwned = count;

    this._persistInventoryUpdates();
  }

  setItemSoldCount(itemName: string, count: number) {
    if (!this._isValidItem(itemName)) {
      //do some kind of error handling
      return;
    }

    if (!this._inventory.hasOwnProperty(itemName)) {
      this._initAndAddInventoryItem(itemName);
    }

    this._inventory[itemName].numberSold = count;

    this._persistInventoryUpdates();
  }
  
  _initInventory() {
    this.getInventory();
  }
  
  _initAndAddInventoryItem(itemName: string) {
    const startingNumberOwned = 0;
    const startingNumberSold = 0;
    this._inventory[itemName] = {
      'numberOwned': startingNumberOwned,
      'numberSold': startingNumberSold
    };
    this._persistInventoryUpdates();
  }

  _isValidItem(itemName: string) {
    return (itemName && this._itemsService.isValidItem(itemName));
  }

  _persistInventoryUpdates() {
    this._entityManager.updateTable(this._tableName, this._inventory);
  }
}