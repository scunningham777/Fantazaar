import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
    template: `
      <ion-navbar *navbar>
        <ion-title>Fantazaar - {{item.name}}</ion-title>
      </ion-navbar>
      
      <ion-content class="layout-primary">
        <div class="layout-restrainWidth800">
          <div *ngIf="hasStringSources">
            This item can be procured from the following sources:
            <ul>
              <li *ngFor="#stringSource of stringSources" class="sourcesList_stringSource">
                {{stringSource}}
              </li>
            </ul>
          </div>
          <br>
          <div *ngIf="hasBazaarSources">
            This item can be purchased form the Bazaar after selling the following loot items:
            <ul>
              <li *ngFor="#bazaarSource of bazaarSources">
                <a (click)="showItemDetails(bazaarSource.source)">{{bazaarSource.source}}</a> - {{bazaarSource.quantity_needed}} needed
              </li>
            </ul>
          </div>
        </div>
      </ion-content>
      `
})

export class ItemDetailsComponent {
  nav:NavController;
  params: NavParams;
  item;
  hasStringSources;
  hasBazaarSources;
  stringSources;
  bazaarSources;
  
  constructor(nav:NavController, params: NavParams) {
    this.nav = nav;
    this.params = params;
  }
  
  onPageWillEnter(){
		this.item = this.params.data.selectedItem;
    this.hasStringSources = ItemDetailsComponent._hasStringSources(this.item);
    this.hasBazaarSources = ItemDetailsComponent._hasBazaarSources(this.item);
    this.stringSources = this.hasStringSources?this.item.sources.filter(ItemDetailsComponent._isString):[];
    this.bazaarSources = this.hasBazaarSources?this.item.sources.filter(Array.isArray)[0]:[];
	}
  
  showItemDetails(item) {
    this.nav.push(ItemDetailsComponent, {'selectedItem': {name: item}});
  }
  
  static _hasBazaarSources(item) {
    return item.sources.some(Array.isArray);
  }
  
  static _hasStringSources(item) {
    return item.sources.some(ItemDetailsComponent._isString);
  }
  
  static _isString(source) {
    return (typeof source === "string");
  }
}