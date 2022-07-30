"use strict";
const Database = use("Database");
const { validateAll } = use("Validator");
const Helpers = use("Helpers");
const Operator = use("App/Models/Operator");
const Companie = use("App/Models/Companie");
const User = use("App/Models/User");
const Hash = use("Hash");

class ClientController {
    async index({ view }) {
        const gie = await Database.table("companies")
            .where({
                is_deleted: 0,
            })


        const zone = await Database.table("zones")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");
        const tot = await Database.table("companies")
            .getCount();
        const tot_actif = await Database.table("companies")
            .where({
                is_activated: 1,
            })
            .getCount()
        const tot_inactif = await Database.table("companies")
            .where({
                is_activated: 0,
            })
            .getCount()
        return view.render("custumers.index", {
            gie: gie,
            zone: zone,
            tot: tot,
            tot_actif: tot_actif,
            tot_inactif: tot_inactif,
        });
    }
    async view({ params, view }) {
        const companie = await Companie.find(params.id)


        const operators = await Database.table("operators")
            .where({
                companie_id: companie.id,
                is_deleted: 0
            })
            .orderBy("id", "desc");



        const myOp = await Companie.find(companie.id);
        const ops = await myOp.operators().getCount()
        console.log(ops);
        const licences = await Database.table("licences")
            .where({
                companie_id: companie.id,
                is_deleted: 0
            })
            .orderBy("id", "desc");
        const devices = await Database.table("devices")
            .where({
                companie_id: companie.id,
                is_deleted: 0
            })
            .orderBy("id", "desc");
        const vehicules = await Database.table("vehicules")
            .where({
                companie_id: companie.id,
                is_deleted: 0
            })
            .orderBy("id", "desc");
        const lines = await Database.table("lines")
            .where({
                companie_id: companie.id,
                is_deleted: 0
            })
            .orderBy("id", "desc");

        const rates = await Database.table("lines")
            .join("rates", "lines.id ", "=", "rates.line_id")
            .select("rates.name")
            .select("rates.line_id")
            .select("rates.price")
            .groupByRaw("rates.id")


        const tot_op = await Database.table("operators")
            .where({
                companie_id: companie.id,
                is_deleted: 0
            })
            .getCount();


        const tot_bus = await Database.table("vehicules")
            .where({
                companie_id: companie.id,
                is_deleted: 0
            })
            .getCount();


        const zone = await Database.table("zones")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");
        return view.render('custumers.view', {
            companie: companie,
            zone: zone,
            rates: rates,
            licences: licences[0],
            tot_op: tot_op,
            tot_bus: tot_bus,
            lines: lines,
            devices: devices,
            vehicules: vehicules,
            operators: operators
        })
    }
    async create({ response, session, request }) {
        const data = request.only([
            "categorie",
            "name",
            "zone_id",
            "contact_name",
            "contact_phone",
            "contact_email",
            "is_activated",
        ]);
        console.log(data);
        const zone = await Database.table("zones").where({
            id: data.zone_id,
        });

        data.zone_name = zone[0].name;
        const save = await Companie.create(data);
        if (save) {

            const check = await Database.table("users").where({
                zone_id: data.zone_id,
            });
            if (check.length == 0) {
                const user = {
                    name: data.contact_name,
                    username: data.contact_phone,
                    password: "123456",
                    email: data.contact_email,
                    role_id: 2,
                    role_name: "Point focal",
                    zone_id: data.zone_id,
                    zone_name: data.zone_name,
                };

                console.log(user)
                await User.create(user);

            }
            session.flash({
                notification: data.name + " ajouté avec succès!",
            });
        }
        return response.redirect("back");
    }
    async update({ params, request, response, session }) {
        const companie = await Companie.find(params.id);
        companie.merge(
            request.only([
                "categorie",
                "name",
                "zone_id",
                "contact_name",
                "contact_phone",
                "contact_email",
            ])
        );
        console.log("companie_id from request = " + companie.id);
        const zone = await Database.table("zones").where({
            id: companie.zone_id,
        });

        companie.zone_name = zone[0].name;
        const save = await companie.save();
        if (save) {
            session.flash({
                notification: companie.name + " modifié avec succès!",
            });
        }
        return response.redirect("back");
    }
    async blocked({ response, params, session, request }) {
        const companie = await Companie.find(params.id);
        companie.merge(
            request.only([
                "is_activated"
            ])
        );
        const save = await companie.save();

        if (save) {
            session.flash({
                notification: "L'enregistrement a été bloqué !",
            });
        }
        return response.redirect("back");
    }
    async reactived({ response, params, session, request }) {
        const companie = await Companie.find(params.id);
        companie.merge(
            request.only([
                "is_activated"
            ])
        );
        const save = await companie.save();

        if (save) {
            session.flash({
                notification: "L'enregistrement a été réactivé !",
            });
        }
        return response.redirect("back");
    }
    async delete({ response, params, session }) {
        const companie = await Companie.find(params.id)

        const del = await companie.delete()

        if (del) {
            session.flash({
                notification: "L'enregistrement a été supprimé définitivement dans la base de données!",
            });
        }
        return response.redirect("back");
    }
}

module.exports = ClientController;