import {Component} from '@angular/core';
import {NavController, Toast} from 'ionic-angular';
import {InventoryService} from '../../providers/inventory-service/inventory-service'

@Component({
  templateUrl: 'build/pages/settings-page/settings-page.html'
})
export class SettingsPage {
  constructor(
    private _nav: NavController,
    private _inventoryService: InventoryService
  ){
  }
  
  requestClearInventory() {
    if (window.confirm('This will permanently delete your inventory, and cannot be undone. Proceed?')) {
      this._inventoryService.clearEntireInventory()
        .then(() => {
          let successToast = Toast.create({
            message: 'Inventory cleared successfully',
            cssClass: 'fzToast-success',
            duration: 1000
          });
          this._nav.present(successToast);
        })  
        .catch((reason) => {
          let failToast = Toast.create({
            message: 'Something went wrong while clearing the inventory: ' + reason,
            cssClass: 'fzToast-failure',
            showCloseButton: true,
            closeButtonText: 'Ok'
          });
          this._nav.present(failToast);
        });
          
    }
  }
}
