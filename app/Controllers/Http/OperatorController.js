"use strict";
const Database = use("Database");
const Operator = use("App/Models/Operator");
const Vehicule = use("App/Models/Vehicule");
const User = use("App/Models/User");
const Device = use("App/Models/Device");

class OperatorController {
    async index({ auth, view }) {
        const user = auth.getUser();
        const operator = await Database.table("operators")
            .join("companies", "operators.companie_id", "=", "companies.id")
            .where("operators.is_deleted", 0)
            .select("operators.name")
            .select("operators.id")
            .select("operators.phone")
            .select("operators.email")
            .select("companies.id as companie_id")
            .select("operators.is_activated as is_activated")
            .select("companies.name as companie")
            .select("companies.zone_name as zone")
            .orderBy("operators.id", "desc");
        const op = await Operator
            .query()
            .where({ is_deleted: 0 })
            .with('vehicules')
            .first();

        console.log(op)



        const zone = await Database.table("zones")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");
        const gie = await Database.table("companies")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");
        const tot = await Database.table("operators")
            .getCount();
        const tot_actif = await Database.table("operators")
            .where({
                is_activated: 1,
            })
            .getCount()
        const tot_inactif = await Database.table("operators")
            .where({
                is_activated: 0,
            })
            .getCount()
        return view.render("operator.index", {
            gie: gie,
            zone: zone,
            operator: operator,
            tot: tot,
            tot_actif: tot_actif,
            tot_inactif: tot_inactif,
        });
    }
    async view({ view, params }) {
        const operator = await Operator.find(params.id)

        const gie = await Database.table('companies')
            .where({
                is_activated: 1,
            })
        const licences = await Database.table("licences")
            .where({
                companie_id: operator.companie_id,
                is_deleted: 0
            })
            .orderBy("id", "desc");
        const invoices = await Database.table("subscriptions")
            .where({
                operator_id: operator.id,
                is_deleted: 0
            })
            .orderBy("id", "desc");
        const devices = await Database.table("devices")
            .where({
                operator_id: operator.id,
                is_deleted: 0
            })
            .orderBy("id", "desc");
        const vehicules = await Database.table('vehicules')
            .where({
                is_deleted: 0,
                operator_id: operator.id,
            })

        const tot_op = await Database.table("devices")
            .where({
                operator_id: operator.id,
                is_deleted: 0
            })
            .getCount();


        const tot_bus = await Database.table("vehicules")
            .where({
                operator_id: operator.id,
                is_deleted: 0
            })
            .getCount();
        return view.render("operator.view", {
            gie: gie,
            vehicules: vehicules,
            invoices: invoices,
            operator: operator,
            licences: licences[0],
            tot_op: tot_op,
            tot_bus: tot_bus,
            devices: devices,
        });
    }
    async create({ response, session, request }) {
        const data = request.only([
            "name",
            "is_activated",
            "phone",
            "companie_id",
        ]);
        console.log(data);
        const gie = await Database.table("companies").where({
            id: data.companie_id,
        });
        data.zone_id = gie[0].zone_id;
        data.zone_name = gie[0].zone_name;
        data.companie_name = gie[0].name;
        data.email = data.phone + '@yawa-trans.com';
        data.type = 'OPERATEUR BUS TATA';
        const save = await Operator.create(data);
        if (save) {
            const operator = await Operator.find(save.id);
            const data2 = {
                name: operator.name,
                username: operator.phone,
                password: "123456",
                email: operator.email,
                role_id: 4,
                role_name: "Opérateur",
                operator_id: operator.id,
                companie_id: operator.companie_id,
                companie_name: operator.companie_name,
                zone_id: operator.zone_id,
                zone_name: operator.zone_name,
            };
            await User.create(data2);
            session.flash({
                notification: data.name + " ajouté avec succès!",
            });
        }
        return response.redirect("back");
    }
    async update({ params, request, response, session }) {
        const operator = await Operator.find(params.id);
        operator.merge(
            request.only(["name", "is_activated", "phone", "email", "companie_id"])
        );
        const gie = await Database.table("companies").where({
            id: operator.companie_id,
        });

        console.log(gie);
        operator.zone_id = gie[0].zone_id;
        operator.zone_name = gie[0].zone_name;
        operator.companie_name = gie[0].name;
        const save = await operator.save();
        if (save) {
            session.flash({
                notification: operator.name + " modifié avec succès!",
            });
        }
        return response.redirect("back");
    }
    async addBus({ response, session, request, params }) {
        const operator = await Operator.find(params.id);
        const data = request.only(["matricule", "is_activated"]);
        console.log(data);

        data.operator_id = operator.id;
        data.zone_id = operator.zone_id;
        data.companie_id = operator.companie_id;
        data.operator_name = operator.name;
        data.companie_name = operator.companie_name;
        data.zone_name = operator.zone_name;
        const save = await Vehicule.create(data);
        if (save) {
            session.flash({
                notification: data.matricule + " ajouté avec succès!",
            });
        }
        return response.redirect("back");
    }

    async addDevice({ response, session, request }) {
        const data = request.only(["phone", "connexion_type", "vehicule_id"]);
        console.log(data);

        const vehicule = await Vehicule.find(data.vehicule_id)
        if (data.connexion_type === 'ORANGE') {
            data.connexion_img = 'assets/images/connexion/orange.png'
        } else {
            data.connexion_img = 'assets/images/connexion/free.png'

        }
        data.vehicule_matricule = vehicule.matricule;
        data.operator_id = vehicule.operator_id;
        data.operator_name = vehicule.operator_name;
        data.companie_id = vehicule.companie_id;
        data.companie_name = vehicule.companie_name;
        data.zone_id = vehicule.zone_id;
        data.zone_name = vehicule.zone_name;
        const save = await Device.create(data);
        if (save) {
            session.flash({
                notification: data.phone + " ajouté avec succès!",
            });
        }
        return response.redirect("back");
    }
    async blocked({ response, params, session, request }) {
        const operator = await Operator.find(params.id);
        operator.merge(
            request.only([
                "is_activated"
            ])
        );
        const save = await operator.save();

        if (save) {
            session.flash({
                notification: "L'enregistrement a été bloqué !",
            });
        }
        return response.redirect("back");
    }
    async reactived({ response, params, session, request }) {
        const operator = await Operator.find(params.id);
        operator.merge(
            request.only([
                "is_activated"
            ])
        );
        const save = await operator.save();

        if (save) {
            session.flash({
                notification: "L'enregistrement a été réactivé !",
            });
        }
        return response.redirect("back");
    }
    async delete({ response, params, session }) {
        const operator = await Operator.find(params.id)

        const del = await operator.delete()

        if (del) {
            session.flash({
                notification: "L'enregistrement a été supprimé définitivement dans la base de données!",
            });
        }
        return response.redirect("back");
    }
}

module.exports = OperatorController;