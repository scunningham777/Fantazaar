import {Injectable} from "angular2/core";

import {Storage, SqlStorage} from "ionic-angular";

const databaseName = "fantazaar.db";

@Injectable()
export class EntityManager {
  storage: Storage;
	constructor() {
		this.storage = new Storage(SqlStorage, {name: databaseName});
	}

  updateTable(tableName: string, tableData) {
    if (typeof tableData === "object") {
      tableData = JSON.stringify(tableData);
    }
    this.storage.set(tableName.toLowerCase(), tableData);
  }
  
  getTable(tableName: string) {
    return this.storage.get(tableName.toLowerCase());
  }
}