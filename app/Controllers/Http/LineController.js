'use strict'
const Database = use("Database");
const { validateAll } = use("Validator");
const Helpers = use("Helpers");
const Companie = use("App/Models/Companie");
const Line = use("App/Models/Line");
const Operator = use("App/Models/Operator");
const Rate = use("App/Models/Rate");

class LineController {

    async index({ view }) {
        const lines = await Database.table("lines")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");
        const gie = await Database.table("companies")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");

        const tot = await Database.table("lines")
            .getCount();
        const tot_actif = await Database.table("lines")
            .where({
                is_activated: 1,
            })
            .getCount()
        const tot_inactif = await Database.table("lines")
            .where({
                is_activated: 0,
            })
            .getCount()
        return view.render("lines.index", {
            lines: lines,
            tot: tot,
            gie: gie,
            tot_actif: tot_actif,
            tot_inactif: tot_inactif,
        });
    }
    async create({ response, session, request }) {
        const data = request.only(["name", "point_a", "point_b", "companie_id"]);
        console.log(data);

        const companie = await Companie.find(data.companie_id)
        data.companie_name = companie.name;
        data.zone_id = companie.zone_id;
        data.zone_name = companie.zone_name;
        const save = await Line.create(data);
        if (save) {
            session.flash({
                notification: data.name + " ajouté avec succès!",
            });
        }
        return response.redirect("back");
    }
    async update({ response, params, session, request }) {
        const line = await Line.find(params.id);
        line.merge(
            request.only(["name", "point_a", "point_b", "companie_id"])
        );

        const companie = await Companie.find(line.companie_id)
        line.companie_name = companie.name;
        line.zone_id = companie.zone_id;
        line.zone_name = companie.zone_name;
        const save = await line.save();

        if (save) {
            session.flash({
                notification: line.name + " modifié avec succès!",
            });
        }
        return response.redirect("back");
    }
    async rate({ response, params, request }) {
        const line = await Line.find(params.id);
        const data = request.only(["name", "price"]);

        data.line_id = line.id;
        data.companie_id = line.companie_id;
        data.companie_name = line.companie_name;
        data.zone_id = line.zone_id;
        data.zone_name = line.zone_name;
        await Rate.create(data);


        return response.redirect("back");
    }

    async blocked({ response, params, session, request }) {
        const line = await Line.find(params.id);
        line.merge(
            request.only([
                "is_activated"
            ])
        );
        const save = await line.save();

        if (save) {
            session.flash({
                notification: "L'enregistrement a été bloqué !",
            });
        }
        return response.redirect("back");
    }
    async reactived({ response, params, session, request }) {
        const line = await Line.find(params.id);
        line.merge(
            request.only([
                "is_activated"
            ])
        );
        const save = await line.save();

        if (save) {
            session.flash({
                notification: "L'enregistrement a été réactivé !",
            });
        }
        return response.redirect("back");
    }
    async view({ params, view }) {
        const line = await Line.find(params.id);
        const rates = await Database.table("rates")
            .where({
                line_id: line.id,
                is_deleted: 0,
            })
            .orderBy("id", "desc");

        const gie = await Database.table("companies")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");
        return view.render("lines.view", {
            line: line,
            rates: rates,
            gie: gie,
        });
    }
    async delete({ response, params, session }) {
        const line = await Line.find(params.id)

        const del = await line.delete()

        if (del) {
            session.flash({
                notification: "L'enregistrement a été supprimé définitivement dans la base de données!",
            });
        }
        return response.redirect("back");
    }

    async rateDel({ response, params, session }) {
        const rate = await Rate.find(params.id)

        const del = await rate.delete()

        if (del) {
            session.flash({
                notification: "L'enregistrement a été supprimé définitivement dans la base de données!",
            });
        }
        return response.redirect("back");
    }

}

module.exports = LineController