"use strict";
const Zone = use("App/Models/Zone");
const Database = use("Database");
const { validateAll } = use("Validator");
const Helpers = use("Helpers");

class ZoneController {
    async index({ view, auth }) {
        const user = await auth.getUser();
        const zone = await Zone.find(user.compagny_id);
        console.log(zone);
        return view.render("parametre.zone", {
            user: user.toJSON(),
            zone: zone,
        });
    }
}

module.exports = ZoneController;