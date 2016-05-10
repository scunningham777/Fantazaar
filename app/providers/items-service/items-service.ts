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

    getItemById(requestedId: number): Item {
        return this._getItemByProperty('_id', requestedId);
    }
    
    getItemByName(requestedName: string): Item {
        return this._getItemByProperty('name', requestedName);
    }

    isValidItem(itemName: string): boolean {
        return (itemName && this._getItems().hasOwnProperty(itemName));
    }
    
    _getItemByProperty(propertyName: string, comparisonValue: any): Item {
        let matchingItem: Item;
        this._allItems
            .then((value: Item[]) => {
                for (let i=0; i<value.length; i++) {
                    if (value[i][propertyName] = comparisonValue) {
                        matchingItem = value[i];
                        break;
                    }
                }
            })
        return matchingItem;
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