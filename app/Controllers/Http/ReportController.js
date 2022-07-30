'use strict'
const Database = use("Database");
const Operator = use("App/Models/Operator");
const Companie = use("App/Models/Companie");

class ReportController {

    async index({ view, auth }) {
        const user = await auth.getUser()
        var vehicules;
        var gie;
        if (user.role_id == 1) {

            gie = await Database.table("companies")
                .where({
                    is_activated: 1,
                });

            vehicules = await Database.table('vehicules')
                .where({
                    is_activated: 1,
                }).orderBy("id", "desc");

        } else if (user.role_id == 2) {
            gie = await Database.table("companies")
                .where({
                    is_activated: 1,
                    zone_id: user.zone_id,
                });

            vehicules = await Database.table('vehicules')
                .where({
                    is_activated: 1,
                    zone_id: user.zone_id,
                }).orderBy("id", "desc");
        } else if (user.role_id == 3) {

            vehicules = await Database.table('vehicules')
                .where({
                    is_activated: 1,
                    companie_id: user.companie_id,
                }).orderBy("id", "desc");
        } else if (user.role_id == 4) {
            vehicules = await Database.table('vehicules')
                .where({
                    is_activated: 1,
                    operator_id: user.operator_id,
                }).orderBy("id", "desc");
        }
        return view.render('reports.index', {
            vehicules: vehicules,
            gie: gie,
        })
    }

    async request({ request, response, auth, session, view }) {
        var data;
        var user = await auth.getUser()
        var services;
        var tickets_sum;
        var tickets_count;
        var expenses_sum;
        var gie;
        var operator;
        if (user.role_id == 1) {
            data = request.only([
                "vehicule_id",
                "dates",
                "date1",
                "date2"
            ]);

            data.date1 = data.dates.slice(0, 10);
            data.date2 = data.dates.slice(14, 30);
            if (data.vehicule_id == 0) {
                services = await Database.table('services')
                    .where({
                        is_activated: 0,
                    }).whereBetween("created_at", [data.date1, data.date2])
                    .orderBy("service_date", "desc");

                tickets_sum = await Database.table('services')
                    .where({
                        is_activated: 0,
                    }).whereBetween("created_at", [data.date1, data.date2])
                    .getSum("tickets_sum");
                tickets_count = await Database.table('services')
                    .where({
                        is_activated: 0,
                    }).whereBetween("created_at", [data.date1, data.date2])
                    .getSum("tickets_count");
                expenses_sum = await Database.table('services')
                    .where({
                        is_activated: 0,
                    }).whereBetween("created_at", [data.date1, data.date2])
                    .getSum("service_expense");

            } else {
                services = await Database.table('services')
                    .where({
                        vehicule_id: data.vehicule_id,
                        is_activated: 0,
                    }).whereBetween("created_at", [data.date1, data.date2])
                    .orderBy("service_date", "desc");
                tickets_count = await Database.table('services')
                    .where({
                        vehicule_id: data.vehicule_id,
                        is_activated: 0,
                    }).whereBetween("created_at", [data.date1, data.date2])
                    .getSum("tickets_count");

                tickets_sum = await Database.table('services')
                    .where({
                        vehicule_id: data.vehicule_id,
                        is_activated: 0,
                    }).whereBetween("created_at", [data.date1, data.date2])
                    .getSum("tickets_sum");
                expenses_sum = await Database.table('services')
                    .where({
                        vehicule_id: data.vehicule_id,
                        is_activated: 0,
                    })
                    .whereBetween("created_at", [data.date1, data.date2])
                    .getSum("service_expense");
            }
        } else if (user.role_id == 2) {
            data = request.only([
                "vehicule_id",
                "dates",
                "date1",
                "date2"
            ]);

            data.date1 = data.dates.slice(0, 10);
            data.date2 = data.dates.slice(14, 30);
            gie = await Companie.find(data.vehicule_id)
            services = await Database.table('services')
                .join("tickets", "services.id", "=", "tickets.service_id")
                .join("expenses", "services.id", "=", "expenses.service_id")
                .where("expenses.name", "Carburant")
                .where("services.companie_id", data.vehicule_id)
                .where("services.is_activated", 0)
                .where("services.zone_id", user.zone_id)
                .whereBetween("services.created_at", [data.date1, data.date2])
                .select("services.vehicule_matricule")
                .select("services.line_name")
                .select("services.service_date")
                .select("services.tickets_sum")
                .select("services.service_expense")
                .select("services.service_balance")
                .sum("tickets.qut as qut")
                .sum("expenses.sum as cab")
                .groupByRaw("services.id")
                .orderBy("services.service_date", "desc");












            tickets_count = await Database.table('services')
                .where({
                    companie_id: data.vehicule_id,
                    zone_id: user.zone_id,
                    is_activated: 0,
                }).whereBetween("created_at", [data.date1, data.date2])
                .getSum("tickets_count");
            tickets_sum = await Database.table('services')
                .where({
                    companie_id: data.vehicule_id,
                    is_activated: 0,
                    zone_id: user.zone_id,
                }).whereBetween("created_at", [data.date1, data.date2])
                .getSum("tickets_sum");
            expenses_sum = await Database.table('services')
                .where({
                    companie_id: data.vehicule_id,
                    is_activated: 0,
                    zone_id: user.zone_id,
                })
                .whereBetween("created_at", [data.date1, data.date2])
                .getSum("service_expense");
        } else if (user.role_id == 3) {

        } else if (user.role_id == 4) {
            data = request.only([
                "vehicule_id",
                "dates",
                "date1",
                "date2"
            ]);

            data.date1 = data.dates.slice(0, 10);
            data.date2 = data.dates.slice(14, 30);
            operator = await Operator.find(user.operator_id)
            if (data.vehicule_id == 0) {
                services = await Database.table('services')
                    .where({
                        is_activated: 0,
                        operator_id: user.operator_id,
                    }).whereBetween("created_at", [data.date1, data.date2])
                    .orderBy("service_date", "desc");

                tickets_count = await Database.table('services')
                    .where({
                        operator_id: user.operator_id,
                        is_activated: 0,
                    }).whereBetween("created_at", [data.date1, data.date2])
                    .getSum("tickets_count");
                tickets_sum = await Database.table('services')
                    .where({
                        operator_id: user.operator_id,
                        is_activated: 0,
                    }).whereBetween("created_at", [data.date1, data.date2])
                    .getSum("tickets_sum");

                expenses_sum = await Database.table('services')
                    .where({
                        operator_id: user.operator_id,
                        is_activated: 0,
                    }).whereBetween("created_at", [data.date1, data.date2])
                    .getSum("service_expense");

            } else {
                services = await Database.table('services')
                    .where({
                        vehicule_id: data.vehicule_id,
                        is_activated: 0,
                        operator_id: user.operator_id,
                    }).whereBetween("created_at", [data.date1, data.date2])
                    .orderBy("service_date", "desc");
                tickets_count = await Database.table('services')
                    .where({
                        vehicule_id: data.vehicule_id,
                        operator_id: user.operator_id,
                        is_activated: 0,
                    }).whereBetween("created_at", [data.date1, data.date2])
                    .getSum("tickets_count");

                tickets_sum = await Database.table('services')
                    .where({
                        vehicule_id: data.vehicule_id,
                        is_activated: 0,
                        operator_id: user.operator_id,
                    }).whereBetween("created_at", [data.date1, data.date2])
                    .getSum("tickets_sum");
                expenses_sum = await Database.table('services')
                    .where({
                        vehicule_id: data.vehicule_id,
                        is_activated: 0,
                        operator_id: user.operator_id,
                    })
                    .whereBetween("created_at", [data.date1, data.date2])
                    .getSum("service_expense");
            }


        } else if (user.role_id == 5) {

        }



        return view.render('reports.view', {
            services: services,
            tickets_sum: tickets_sum,
            gie: gie,
            tickets_sum: tickets_sum,
            operator: operator,
            expenses_sum: expenses_sum,
            dates: {
                date1: data.date1,
                date2: data.date2
            }
        })

    }
}

module.exports = ReportController