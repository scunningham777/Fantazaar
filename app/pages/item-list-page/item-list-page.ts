import {Page} from 'ionic-angular';
import {NavController} from 'ionic-angular';
import {ValuesPipe} from '../../utils/values.pipe';
import {ItemDetailsPage} from '../item-details-page/item-details-page';
import {ItemsService} from '../../providers/items-service/items-service';
import {InventoryService} from '../../providers/inventory-service/inventory-service';

@Page({
  pipes: [ValuesPipe],
  templateUrl: 'build/pages/item-list-page/item-list-page.html'
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
    this.nav.push(ItemDetailsPage, { 'selectedItem': item.name });
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
