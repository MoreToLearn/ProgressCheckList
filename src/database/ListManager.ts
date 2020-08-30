import BaseManager from "./BaseManager";

export default class ListManager extends BaseManager {
    constructor(db, mainManager) {
        super(db, "lists", "name TEXT, date_created TEXT, owner TEXT", mainManager);
    }
    notes(id) {
        return this.mainManager.api.prepare(`SELECT DISTINCT * FROM notes WHERE list_id=?`).all(id);
    }
}
