"use strict";
const Database = use("Database");
const { validateAll } = use("Validator");
const Helpers = use("Helpers");
const Operator = use("App/Models/Operator");
const Companie = use("App/Models/Companie");
const Service = use("App/Models/Service");
const Line = use("App/Models/Line");
const Device = use("App/Models/Device");
const Rate = use("App/Models/Rate");
const Ticket = use("App/Models/Ticket");
const Expense = use("App/Models/Expense");
const Rotation = use("App/Models/Rotation");

class ApiController {
    async login({ response, request }) {
        const data = request.only(["username", "password"]);
        // const data = {
        //     username: "KD8963A",
        //     password: "123456",
        // };

        var device;
        var service;
        var lines;
        var rotations;
        var expenses;
        var tickets;
        var rates;
        var status;
        const d = new Date();
        var options3 = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        };
        const today = new Intl.DateTimeFormat("fr", options3).format(d);

        device = await Database.table("devices").where({
            vehicule_matricule: data.username,
            password: data.password,
            is_activated: 1,
        });

        console.log('device ' + device[0])
        if (device.length >= 1) {
            lines = await Database.table("devices").where({
                companie_id: device[0].companie_id,
                is_activated: 1,
            });
            status = "noo"
            const data = {
                user: device[0],
                service: service,
                line: lines,
                section: rates,
                voyage: rotations,
                tkt: tickets,
                depense: expenses,
                etat: status,
            };
            console.log('device ' + device[0])
            console.log('lines ' + lines)

            return response.status(202).json({
                data: data
            });
        } else {
            return response
                .status(403)
                .send("Oups! Identifiants incorrects ou appareil bloqué.");
        }


    }
}

module.exports = ApiController;