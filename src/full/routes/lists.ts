import { Router } from "express";
import { nanoid } from "nanoid";
const lists = new Router();

lists.get("/create", (req, res) => {
    return res.render("list_routes/create-list");
});

lists.get("/:id/create", async (req, res) => {
    return res.render("note_routes/create-note", {
        id: req.params.id,
    });
});

lists
    .route("/")
    .get((req, res) => {
        const lists = req.app.database.lists.all();
        return res.render("list_routes/lists", {
            lists: lists,
        });
    })
    .post((req, res) => {
        console.log(req.body);
        if (!req.body.name)
            return res.status(400).json({
                error: true,
                message: "You must provide a list name",
                field: "name",
            });
        if (!req.body.owner)
            return res.status(400).json({
                error: true,
                message: "You must provide an owner name",
                field: "owner",
            });

        try {
            const id = nanoid();
            const dateCreated = new Date().toDateString();
            req.app.database.lists.add(id, [req.body.name, dateCreated, req.body.owner]);
            return res.redirect(`/lists/${id}`);
        } catch (e) {
            const err: any = new Error();
            err.status = 500;
            throw e;
        }
    });

lists
    .route("/:id")
    .get((req, res) => {
        try {
            const List = req.app.database.lists.notes(req.params.id);
            return res.render("list_routes/list", {
                list: List,
                id: req.params.id,
            });
        } catch (e) {
            const err: any = new Error();
            err.status = 500;
            throw e;
        }
    })
    .delete((req, res) => {
        try {
            const List = req.app.database.lists.get(req.params.id);
            if (!List) {
                throw new Error("That List does not exist");
            }
            req.app.database.lists.delete(req.params.id);
            return res.redirect("/lists");
        } catch (e) {
            const err: any = new Error();
            err.status = 500;
            throw e;
        }
    });

lists
    .route("/:id/notes")
    .get((req, res) => {
        try {
            const List = req.app.database.lists.notes(req.params.id);
            return res.render("list_routes/lists", {
                lists: List,
            });
        } catch (e) {
            const err: any = new Error();
            err.status = 500;
            throw e;
        }
    })
    .post((req, res) => {
        if (!req.body.name)
            return res.status(400).json({
                error: true,
                message: "Must provide a name for the list",
            });
        if (!req.body.owner)
            return res.status(400).json({
                error: true,
                message: "Must provide an owner for the list",
            });
        if (!req.body.description)
            return res.status(400).json({
                error: true,
                message: "Must provide a description for the list",
            });

        try {
            const List = req.app.database.lists.get(req.params.id);
            if (!List)
                return res.status(404).json({
                    error: true,
                    message: "The List you are trying to assign this note to does not exist",
                });
            const id = nanoid();
            const dateCreated = new Date().toDateString();
            req.app.database.notes.add(id, [
                req.params.id,
                req.body.name,
                dateCreated,
                req.body.owner,
                req.body.description,
                "not_done",
            ]);
            return res.redirect(`/notes/${id}`);
        } catch (e) {
            const err: any = new Error();
            err.status = 500;
            throw e;
        }
    });

export default lists;
