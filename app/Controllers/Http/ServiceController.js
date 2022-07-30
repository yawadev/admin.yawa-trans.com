'use strict'
const Database = use("Database");
const Operator = use("App/Models/Operator");
const Companie = use("App/Models/Companie");
const Service = use("App/Models/Service");
const Line = use("App/Models/Line");
const Device = use("App/Models/Device");
const Rate = use("App/Models/Rate");
const Ticket = use("App/Models/Ticket");
const Expense = use("App/Models/Expense");
const Rotation = use("App/Models/Rotation");

class ServiceController {

    async index({ view, auth }) {
        const user = await auth.getUser()
        var online_services;
        var offline_services;
        var online_services_count;
        var devices;
        var operator;
        if (user.role_id == 1) {


            online_services = await Database.table('services')
                .where({
                    is_activated: 1,
                }).orderBy("id", "desc");

            online_services_count = await Database.table("services")
                .where({
                    is_activated: 1,
                })
                .getCount()
            devices = await Database.table("devices")
                .where({
                    is_activated: 1,
                })
                .getCount()
            offline_services = await Database.table('services')
                .where({
                    is_activated: 0,
                }).orderBy("service_date", "desc");

        } else if (user.role_id == 2) {
            online_services = await Database.table('services')
                .where({
                    is_activated: 1,
                    zone_id: user.zone_id,
                }).orderBy("id", "desc");

            online_services_count = await Database.table("services")
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
            offline_services = await Database.table('services')
                .where({
                    is_activated: 0,
                    zone_id: user.zone_id,
                }).orderBy("service_date", "desc");
        } else if (user.role_id == 3) {
            online_services = await Database.table('services')
                .where({
                    is_activated: 1,
                    companie_id: user.companie_id,
                }).orderBy("id", "desc");

            online_services_count = await Database.table("services")
                .where({
                    is_activated: 1,
                    companie_id: user.companie_id,
                })
                .getCount()
            devices = await Database.table("devices")
                .where({
                    is_activated: 1,
                    companie_id: user.companie_id,
                })
                .getCount()
            offline_services = await Database.table('services')
                .where({
                    is_activated: 0,
                    companie_id: user.companie_id,
                }).orderBy("service_date", "desc");
        } else if (user.role_id == 4) {
            online_services = await Database.table('services')
                .where({
                    is_activated: 1,
                    operator_id: user.operator_id,
                }).orderBy("id", "desc");

            online_services_count = await Database.table("services")
                .where({
                    is_activated: 1,
                    operator_id: user.operator_id,
                })
                .getCount()
            devices = await Database.table("devices")
                .where({
                    is_activated: 1,
                    operator_id: user.operator_id,
                })
                .getCount()
            offline_services = await Database.table('services')
                .where({
                    is_activated: 0,
                    operator_id: user.operator_id,
                }).orderBy("service_date", "desc");
        } else if (user.role_id == 5) {

        }


        return view.render('services.list', {
            online_services: online_services,
            online_services_count: online_services_count,
            devices: devices,
            offline_services: offline_services
        })

    }

    async list({ view, auth, params }) {
        const user = await auth.getUser();
        // rôle: 1 = Super administrateur
        const services = await Database.table('services')
            .where({
                companie_id: params.id,
            }).orderBy("service_date", "desc");

        const companie = await Companie.find(params.id)
        return view.render('services.list', {
            companie: companie,
            services: services
        })

    }

    async view({ params, view }) {
        const service = await Service.find(params.id)
        const rotations = await Database.table("rotations").where({
            service_id: service.id,
        });

        const tickets = await Database.table("tickets").where({
            service_id: service.id,
        });
        const expenses = await Database.table("expenses").where({
            service_id: service.id,
        });


        return view.render('services.view', {
            service: service,
            expenses: expenses,
            rotations: rotations,
            tickets: tickets,
        })
    }

    async update({ response, params, session, request }) {
        const service = await Service.find(params.id);
        service.merge(
            request.only(["tickets_count", "tickets_sum", "service_balance", "service_expense"])
        );
        service.service_balance = service.tickets_sum - service.service_expense;
        const save = await service.save();

        if (save) {
            session.flash({
                notification: service.seller + " modifié avec succès!",
            });
        }
        return response.redirect("back");
    }

    async tickets({ response, params, session, request }) {
        const ticket = await Ticket.find(params.id);
        ticket.merge(
            request.only(["qut"])
        );
        ticket.sum = ticket.price * ticket.qut;
        await ticket.save();
        const tickets_count = await Database.table("tickets").where({
            service_id: ticket.service_id
        }).getSum("qut");


        const tickets_sum = await Database.table("tickets").where({
            service_id: ticket.service_id
        }).getSum("sum");

        await Database.table("services")
            .where({
                id: ticket.service_id
            })
            .update({
                tickets_count: tickets_count,
                tickets_sum: tickets_sum,
            });

        return response.redirect("back");
    }

    async blocked({ response, params, session, request }) {
        const service = await Service.find(params.id);
        service.merge(
            request.only([
                "is_activated"
            ])
        );
        const save = await service.save();

        if (save) {
            session.flash({
                notification: "L'enregistrement a été bloqué !",
            });
        }
        return response.redirect("back");
    }

    async reactived({ response, params, session, request }) {
        const service = await Service.find(params.id);
        service.merge(
            request.only([
                "is_activated"
            ])
        );
        const save = await service.save();

        if (save) {
            session.flash({
                notification: "L'enregistrement a été réactivé !",
            });
        }
        return response.redirect("back");
    }
}

module.exports = ServiceController