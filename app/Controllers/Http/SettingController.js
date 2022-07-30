'use strict'
const Database = use("Database");
const { validateAll } = use("Validator");
const Helpers = use("Helpers");
const Zone = use("App/Models/Zone");

class SettingController {

    async zone({ view }) {
        const zone = await Database.table("zones")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");

        return view.render("settings.zones.index", {
            zone: zone
        });
    }

    async zoneCreate({ response, session, request }) {
        const data = request.only([
            "name",
            "is_activated",
            "pays",
        ]);
        const save = await Zone.create(data);
        if (save) {
            session.flash({
                notification: data.name + " ajouté avec succès!",
            });
        }
        return response.redirect("back");
    }
}

module.exports = SettingController