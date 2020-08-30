export default class BaseManager {
    constructor(private db, public holds: string, public values: string, public mainManager) {
        this.db.prepare(`CREATE TABLE IF NOT EXISTS ${holds}(id TEXT, ${values})`).run();
    }
    get(id: string) {
        id = id.trim();
        return this.db.prepare(`SELECT DISTINCT * FROM ${this.holds} WHERE id=?`).get(id);
    }
    delete(id: string) {
        id = id.trim();
        return this.db.prepare(`DELETE FROM ${this.holds} WHERE id=?`).run(id);
    }
    all() {
        return this.db.prepare(`SELECT DISTINCT * FROM ${this.holds}`).all();
    }
    add(id: string, values: Array<string>) {
        id = id.trim();
        return this.db.prepare(`INSERT INTO ${this.holds} VALUES(?${", ?".repeat(values.length)})`).run(id, ...values);
    }
}
