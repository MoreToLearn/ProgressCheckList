import { Router } from "express";
const notes = new Router();

notes
    .route("/:id")
    .get((req, res) => {
        try {
            const Note = req.app.database.notes.get(req.params.id);
            return res.render("note_routes/note", {
                note: Note,
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
            const Note = req.app.database.notes.get(req.params.id);
            if (!Note) {
                return res.status(404).json({
                    error: true,
                    message: "That Note does not exist.",
                });
            }
            req.app.database.notes.delete(req.params.id);
            return res.status(200).json({
                error: false,
                message: "Note successfully queued for deletion",
            });
        } catch (e) {
            const err: any = new Error();
            err.status = 500;
            throw e;
        }
    });

notes
    .route("/:id/edit")
    .get(async (req, res) => {
        return res.render("note_routes/edit-note", {
            id: req.params.id,
        });
    })
    .post(async (req, res) => {
        switch (req.body.status) {
            case "in_progress": {
                req.app.database.notes.edit(req.params.id, "in_progress");
                break;
            }
            case "done": {
                req.app.database.notes.edit(req.params.id, "done");
                break;
            }
            case "not_done": {
                req.app.database.notes.edit(req.params.id, "not_done");
                break;
            }
            default: {
                throw new Error("That don't exist boy");
            }
        }
        return res.redirect(`/notes/${req.params.id}`);
    });

export default notes;
