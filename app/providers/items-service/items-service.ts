import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

const ITEMS_URL = 'assets/seed-data/items.json';

export interface Item {
    _id: number,
    name: string,
    basic_sources: BasicItemSource[],
    bazaar_sources: {source_id: number, quantity_needed: number}[]
}

export interface BasicItemSource {
    primary_text: string,
    secondary_texts: string[]
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
    
    getItemSourceList(requestedItem: Item): Promise<{source_id: number, source_name: string, quantity_needed:number}[]> {
        let sourceListPromise = new Promise((resolve, reject) => {
            this._getItems().then((items: Item[]) => {
                let sourceList = requestedItem.bazaar_sources
                    .map(source => {
                        let getItemByIdSync = () => items.find(item => item._id == source.source_id); 
                        
                        if (!getItemByIdSync()) return;
                        
                        let hydratedSource = {
                            source_id: source.source_id, 
                            source_name: getItemByIdSync().name, 
                            quantity_needed: source.quantity_needed
                        };
                        return hydratedSource;
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
                .then( items => {
                    let foundItem = items.find( item => item[propertyName] === comparisonValue );
                    resolve(foundItem);         
                })
        });
        
        return matchingItemPromise;
    }

    _getItems(): Promise<Item[]> {
        if (!this._allItems) {
            this._allItems = this._http.get(ITEMS_URL)
                .map((response: Response) => {
                    return <Item[]>response.json()
                })
                .toPromise();
        }
          
        return this._allItems;
    }
}