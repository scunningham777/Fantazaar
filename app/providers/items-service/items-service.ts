import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';

let itemsUrl = 'assets/seed-data/items.json';

export interface Item {
    _id: number,
    name: string,
    sources: any[];
}

@Injectable()
export class ItemsService {
    _allItems: Promise<Item[]>;

    constructor(private _http: Http) {
        this._getItems();
    }

    getAllItems(): Promise<Item[]> {
        return this._getItems();
    }

    getItemById(requestedId: number): Promise<Item> {
        return this._getItemByProperty('_id', requestedId);
    }
    
    getItemByName(requestedName: string): Promise<Item> {
        return this._getItemByProperty('name', requestedName);
    }
    
    getItemSourceList(requestedItem: Item): Promise<Array<{source_id: number, source_name: string, quantity_needed:number}>> {
        let sourceListPromise = new Promise((resolve, reject) => {
            this._getItems().then((items: Item[]) => {
                let sourceList = requestedItem.sources
                    .filter(Array.isArray)[0]
                    .map(source => {
                        if (!items[source.source_id]) return;
                        return {
                            source_id: source.source_id, 
                            source_name: items[source.source_id].name, 
                            quantity_needed: source.quantity_needed
                        };
                    });
                resolve(sourceList);
            })    
        })
        
        return sourceListPromise;
    }

    isValidItem(itemName: string): Promise<boolean> {
        let isValidAsPromise = new Promise((resolve, reject) => {
            this._getItems()
                .then((items: Item[]) => {
                    resolve(itemName && items.hasOwnProperty(itemName));
                });
        });
        return isValidAsPromise;
    }
    
    _getItemByProperty(propertyName: string, comparisonValue: any): Promise<Item> {
        let matchingItemPromise = new Promise((resolve, reject) => {
            this._getItems()
                .then((items: Item[]) => {
                    for (let i=0; i<items.length; i++) {
                        if (items[i][propertyName] = comparisonValue) {
                            resolve(items[i]);
                        }
                    }
                });
        });
        
        return matchingItemPromise;
    }

    _getItems(): Promise<Item[]> {
        if (!this._allItems) {
            this._allItems = this._http.get(itemsUrl)
                .map((response: Response) => {
                    return <Item[]>response.json()
                })
                .toPromise();
        }
          
        return this._allItems;
    }
}