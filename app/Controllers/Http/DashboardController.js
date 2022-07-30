"use strict";
const Database = use("Database");
const Stock = use("App/Models/Stock");

class DashboardController {
    async index({ view, auth }) {
        const user = await auth.getUser()
        var gie;
        var zone;
        var operators;
        var vehicules;
        var devices;
        var online_services_count;
        var online_services;
        var subscriptions;
        var recharge_exp;
        var stock;
        if (user.role_id == 1) {
            stock = await Stock.find(1)
            gie = await Database.table("companies")
                .where({
                    is_activated: 1,
                }).getCount();

            zone = await Database.table("zones")
                .where({
                    is_deleted: 0,
                })
                .getCount();
            operators = await Database.table("operators")
                .getCount();
            vehicules = await Database.table("vehicules")
                .where({
                    is_activated: 1,
                })
                .getCount()
            devices = await Database.table("devices")
                .where({
                    is_activated: 1,
                })
                .getCount()

            online_services_count = await Database.table("services")
                .where({
                    is_activated: 1,
                })
                .getCount()

            online_services = await Database.table("services")
                .where({
                    is_activated: 1,
                })

            subscriptions = await Database.table("subscriptions")
                .where({
                    payement_status: 0,
                })
                .orWhere({
                    payement_status: 2,
                }).limit(5)

            recharge_exp = await Database.table("recharges")
                .where({
                    is_deleted: 0,
                })
        } else if (user.role_id == 2) {
            gie = await Database.table("companies")
                .where({
                    is_activated: 1,
                    zone_id: user.zone_id,
                }).getCount();

            zone = await Database.table("zones")
                .where({
                    is_deleted: 0,
                    id: user.zone_id,
                })
                .getCount();
            operators = await Database.table("operators")
                .where({
                    is_deleted: 0,
                    zone_id: user.zone_id,
                })
                .getCount();
            vehicules = await Database.table("vehicules")
                .where({
                    is_activated: 1,
                    zone_id: user.zone_id,
                })
                .getCount()
            devices = await Database.table("devices")
                .where({
                    is_activated: 1,
                    zone_id: user.zone_id,
                })
                .getCount()

            online_services_count = await Database.table("services")
                .where({
                    is_activated: 1,
                    zone_id: user.zone_id,
                })
                .getCount()

            online_services = await Database.table("services")
                .where({
                    is_activated: 1,
                    zone_id: user.zone_id,
                })

            subscriptions = await Database.table("subscriptions")
                .where({
                    payement_status: 0,
                    zone_id: user.zone_id,
                })
                .orWhere({
                    payement_status: 2,
                    zone_id: user.zone_id,
                }).limit(5)
        } else if (user.role_id == 3) {

        } else if (user.role_id == 4) {
            vehicules = await Database.table("vehicules")
                .where({
                    operator_id: user.operator_id,
                })
                .getCount()
            devices = await Database.table("devices")
                .where({
                    operator_id: user.operator_id,
                })
                .getCount()

            online_services_count = await Database.table("services")
                .where({
                    operator_id: user.operator_id,
                })
                .getCount()

            online_services = await Database.table("services")
                .where({
                    operator_id: user.operator_id,
                })

            subscriptions = await Database.table("subscriptions")
                .where({
                    payement_status: 0,
                    operator_id: user.operator_id,
                })
                .orWhere({
                    payement_status: 2,
                    operator_id: user.operator_id,
                }).limit(5)
        } else if (user.role_id == 5) {

        }


        return view.render("welcome", {
            gie: gie,
            stock: stock,
            zone: zone,
            operators: operators,
            vehicules: vehicules,
            subscriptions: subscriptions,
            devices: devices,
            online_services_count: online_services_count,
            online_services: online_services,
        });
    }

    async delete({ response, params, session }) {
        const recharge = await Recharge.find(params.id)

        const del = await recharge.delete()

        if (del) {
            session.flash({
                notification: "L'enregistrement a été supprimé définitivement dans la base de données!",
            });
        }
        return response.redirect("back");
    }
}

module.exports = DashboardController;