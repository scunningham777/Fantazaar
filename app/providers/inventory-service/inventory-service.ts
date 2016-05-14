import {ItemsService} from '../items-service/items-service'
import {Injectable} from 'angular2/core';
import {EntityManager} from '../entity-manager';

const INVENTORY_TABLE_NAME = "inventory";

@Injectable()
export class InventoryService {
  private _inventory: Promise<InventoryEntry[]>;
  
  constructor(
    private _itemsService: ItemsService, 
    private _entityManager: EntityManager
  ) {
    this._initInventory();
  }
  
  clearEntireInventory(): Promise<boolean> {
    let clearedPromise = new Promise((resolve, reject) => {
      this._persistInventoryUpdates("")
        .then(result => {
          resolve(true);
        });
    })
    return clearedPromise;
  }
  
  getInventory(): Promise<InventoryEntry[]> {
    this._inventory = new Promise((resolve, reject) => {
      this._entityManager.getTable(INVENTORY_TABLE_NAME)
        .then((inventory: any) => {
          if (!inventory) {
            inventory = {};
          } else {
            inventory = JSON.parse(inventory);
          }
          resolve(inventory);
       });
    });
    
    return this._inventory; 
  }
  
  setItemOwnedCount(itemName: string, count: number) {
    this.getInventory()
      .then(inventory => {
        //TODO: do some kind of error handling to make sure item is valid

        if (!inventory.hasOwnProperty(itemName)) {
           inventory[itemName] = new InventoryEntry(itemName);
        }

        inventory[itemName].numberOwned = count;

        this._persistInventoryUpdates(inventory);
      });
  }

  setItemSoldCount(itemName: string, count: number) {
    this.getInventory()
      .then(inventory => {
        //TODO: do some kind of error handling to make sure item is valid

        if (!inventory.hasOwnProperty(itemName)) {
          inventory[itemName] = new InventoryEntry(itemName);
        }

        inventory[itemName].numberSold = count;

        this._persistInventoryUpdates(inventory);
      });
    
  }
  
  _initInventory(): void {
    this.getInventory();
  }
  
  _initAndAddInventoryItem(itemName: string) {
    const STARTING_NUM_OWNED = 0;
    const STARTING_NUM_SOLD = 0;
    this.getInventory()
      .then(inventory => {
        inventory[itemName] = {
          'numberOwned': STARTING_NUM_OWNED,
          'numberSold': STARTING_NUM_SOLD
        };
        this._persistInventoryUpdates(inventory);
      });
  }

  _isValidItem(itemName: string): Promise<boolean> {
    return this._itemsService.isValidItem(itemName);
  }

  _persistInventoryUpdates(updatedInventory): Promise<any> {
    return this._entityManager.updateTable(INVENTORY_TABLE_NAME, updatedInventory);
  }
}

export class InventoryEntry {
  itemName: string;
  numberOwned = 0;
  numberSold = 0;
  
  constructor (name: string, numOwned?: number, numSold?: number) {
    this.itemName = name;
    this.numberOwned = numOwned;
    this.numberSold = numSold;
  }
}