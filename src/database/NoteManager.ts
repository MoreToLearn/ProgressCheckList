import BaseManager from "./BaseManager";

export default class NoteManager extends BaseManager {
    constructor(db, mainManager) {
        super(
            db,
            "notes",
            "list_id TEXT, name TEXT, date_created TEXT, owner TEXT, description TEXT, status TEXT",
            mainManager,
        );
    }
    edit(id, status) {
        return this.mainManager.api.prepare(`UPDATE notes SET status=? WHERE id=?`).run(status, id);
    }
}
