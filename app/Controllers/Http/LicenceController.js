"use strict";
const Database = use("Database");
const { validateAll } = use("Validator");
const Helpers = use("Helpers");
const Licence = use("App/Models/Licence");
const Companie = use("App/Models/Companie");

class LicenceController {
    async index({ view }) {
        const licences = await Database.table("licences")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");
        const gies = await Database.table("companies")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");

        const tot = await Database.table("licences")
            .getCount();
        const tot_actif = await Database.table("licences")
            .where({
                is_activated: 1,
            })
            .getCount()
        const tot_inactif = await Database.table("licences")
            .where({
                is_activated: 0,
            })
            .getCount()
        return view.render("settings.licences.index", {
            licences: licences,
            gies: gies,
            tot: tot,
            tot_actif: tot_actif,
            tot_inactif: tot_inactif,
        });
    }

    async create({ response, session, request }) {
        const data = request.only([
            "companie_id",
            "invoice_type",
            "amount",
        ]);
        const gie = await Companie.find(data.companie_id)
        data.zone_id = gie.zone_id;
        data.companie_name = gie.name;
        data.zone_name = gie.zone_name;
        const save = await Licence.create(data);
        if (save) {
            session.flash({
                notification: "La licence du " + data.companie_name + " ajouté avec succès!",
            });
        }
        return response.redirect("back");
    }

    async blocked({ response, params, session }) {
        const block = Database.table("licences").where({
                id: params.id,
            })
            .update({ is_activated: false });

        if (block) {
            session.flash({
                notification: "L'enregistrement a été bloqué définitivement dans la base de données!",
            });
        }
        return response.redirect("back");
    }
    async delete({ response, params, session }) {
        const licence = await Licence.find(params.id)

        const del = await licence.delete()

        if (del) {
            session.flash({
                notification: "L'enregistrement a été supprimé définitivement dans la base de données!",
            });
        }
        return response.redirect("back");
    }
}

module.exports = LicenceController