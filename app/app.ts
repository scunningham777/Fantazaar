import 'rxjs/Rx';
import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {TabsPage} from './pages/tabs/tabs';
import {ItemsService} from './providers/items-service/items-service';
import {InventoryService} from './providers/inventory-service/inventory-service';
import {EntityManager} from './providers/entity-manager';
import {providers as platformProviders} from '@ionic/platform-client-angular';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from '@angular/core';

const FZ_PROVIDERS = [
  ItemsService,
  InventoryService,
  EntityManager
];

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
})
export class MyApp {
  rootPage: Type = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
    });
  }
}

let platformConfig = {
  'core': {
    app_id: '04b41c15', 
    api_key: '6bba68c0a3d88c47e37fab47aefa62921ce193d97cd65eb2'
  }
};

// Pass the main app component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument:
// http://ionicframework.com/docs/v2/api/config/Config/
ionicBootstrap(MyApp, [FZ_PROVIDERS, platformProviders(platformConfig)]);