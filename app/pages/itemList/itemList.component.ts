import {Page} from 'ionic-angular';
import {NavController} from 'ionic-angular';
import {ValuesPipe} from '../../utils/values.pipe';
import {ItemDetailsComponent} from '../itemDetails/itemDetails.component';
import {ItemsService} from '../../DAL/items/items.service';
import {InventoryService} from '../../DAL/inventory/inventory.service';

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
  inventoryService: InventoryService;
  items;
  inventory = {};

  constructor(nav: NavController, itemsService: ItemsService, inventoryService: InventoryService) {
    this.nav = nav;
    this.itemsService = itemsService;
    this.inventoryService = inventoryService;
  }

  onPageWillEnter() {
    this.items = this.itemsService.getAllItems();
    this.inventoryService.getInventory()
      .then(inventory => {
        this.inventory = inventory
      });
  }

  showItemDetails(item) {
    this.nav.push(ItemDetailsComponent, { 'selectedItem': item.name });
  }

  incrementItemOwnedCount(item) {
    var startingOwnedCount = this.inventory[item.name] ? this.inventory[item.name].numberOwned : 0;
    this.inventoryService.setItemOwnedCount(item.name, startingOwnedCount+1);
  }

  transferCountFromOwnedToSold(item, countTransferred: number) {
    var startingOwnedCount = this.inventory[item.name] ? this.inventory[item.name].numberOwned : 0;
    var startingSoldCount = this.inventory[item.name] ? this.inventory[item.name].numberSold : 0;

    if (startingOwnedCount < countTransferred) {
      countTransferred = startingOwnedCount;
    }
    
    this.inventoryService.setItemOwnedCount(item.name, startingOwnedCount - countTransferred);
    this.inventoryService.setItemSoldCount(item.name, startingSoldCount + countTransferred);
  }
}
