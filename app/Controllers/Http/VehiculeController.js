"use strict";
const Database = use("Database");
const { validateAll } = use("Validator");
const Helpers = use("Helpers");
const Vehicule = use("App/Models/Vehicule");
const Operator = use("App/Models/Operator");

class VehiculeController {
    async index({ auth, view }) {
        const user = auth.getUser();
        const vehicule = await Database.table("vehicules")
            .join("companies", "vehicules.companie_id", "=", "companies.id")
            .join("operators", "vehicules.operator_id ", "=", "operators.id")
            .where("vehicules.is_deleted", 0)
            .select("vehicules.matricule")
            .select("vehicules.id")
            .select("vehicules.zone_id")
            .select("vehicules.operator_id")
            .select("vehicules.companie_id")
            .select("vehicules.is_activated")
            .select("operators.name as operator")
            .select("companies.name as companie")
            .select("companies.zone_name as zone")
            .orderBy("vehicules.id", "desc");

        const operator = await Database.table("operators")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");
        const tot = await Database.table("vehicules")
            .getCount();
        const tot_actif = await Database.table("vehicules")
            .where({
                is_activated: 1,
            })
            .getCount()
        const tot_inactif = await Database.table("vehicules")
            .where({
                is_activated: 0,
            })
            .getCount()
        console.log(operator);
        console.log(vehicule);


        return view.render("custumers.vehicules", {
            vehicule: vehicule,
            operator: operator,
            tot: tot,
            tot_actif: tot_actif,
            tot_inactif: tot_inactif,
        });
    }
    async view({}) {}
    async create({ response, session, request }) {
        const data = request.only(["matricule", "is_activated", "operator_id"]);
        console.log(data);
        const operator = await Database.table("operators").where({
            id: data.operator_id,
        });
        data.zone_id = operator[0].zone_id;
        data.companie_id = operator[0].companie_id;
        data.operator_name = operator[0].name;
        data.companie_name = operator[0].companie_name;
        data.zone_name = operator[0].zone_name;
        const save = await Vehicule.create(data);
        if (save) {
            session.flash({
                notification: data.matricule + " ajouté avec succès!",
            });
        }
        return response.redirect("back");
    }
    async update({ params, request, response, session }) {
        const data = request.only(["matricule", "is_activated", "operator_id"]);
        console.log(data);
        const operator = await Database.table("operators").where({
            id: data.operator_id,
        });

        console.log(operator);
        const save = await Vehicule.query()
            .where({
                id: params.id,
            })
            .update({
                matricule: data.matricule,
                operator_id: data.operator_id,
                is_activated: data.is_activated,
                zone_id: operator[0].zone_id,
                companie_id: operator[0].companie_id,
            });
        if (save) {
            session.flash({
                notification: data.matricule + " modifié avec succès!",
            });
        }
        return response.redirect("back");
    }
    async blocked({ response, params, session }) {
        const block = Database.table("vehicules").where({
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
        const vehicule = await Vehicule.find(params.id)

        const del = await vehicule.delete()

        if (del) {
            session.flash({
                notification: "L'enregistrement a été supprimé définitivement dans la base de données!",
            });
        }
        return response.redirect("back");
    }
}

module.exports = VehiculeController;