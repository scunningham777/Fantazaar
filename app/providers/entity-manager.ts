import {Injectable} from "@angular/core";

import {Storage, SqlStorage} from "ionic-angular";

const DATABASE_NAME = "fantazaar.db";

@Injectable()
export class EntityManager {
  storage: Storage;
	constructor() {
		this.storage = new Storage(SqlStorage, {name: DATABASE_NAME, existingDatabase: false});
	}

  updateTable(tableName: string, tableData): Promise<any> {
    if (typeof tableData === "object") {
      tableData = JSON.stringify(tableData);
    }
    return this.storage.set(tableName.toLowerCase(), tableData)
      .catch( (reason) => {
        console.log('EntityManager.prototype.updateTable():');
        console.dir(reason.err);
      });
  }
  
  getTable(tableName: string): Promise<string> {
    return this.storage.get(tableName.toLowerCase())
      .catch( (reason) => {
        console.log('EntityManager.prototype.getTable():')
        console.dir(reason.err);
      });
  }
}