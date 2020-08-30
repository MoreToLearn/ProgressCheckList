import Database from "better-sqlite3";
import NoteManager from "./NoteManager";
import ListManager from "./ListManager";

export default class DatabaseManager {
    private db;
    public notes: NoteManager;
    public lists: ListManager;

    constructor() {
        this.db = new Database(`${__dirname}/../../data/database.db`);
        this.notes = new NoteManager(this.db, this);
        this.lists = new ListManager(this.db, this);
    }
    public get api() {
        return this.db;
    }
}
