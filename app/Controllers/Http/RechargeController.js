'use strict'
const Database = use("Database");
const { validateAll } = use("Validator");
const Helpers = use("Helpers");
const Licence = use("App/Models/Licence");
const Companie = use("App/Models/Companie");
const Operator = use("App/Models/Operator");
const Vehicule = use("App/Models/Vehicule");
const Device = use("App/Models/Device");
const Recharge = use("App/Models/Recharge");
const Zone = use("App/Models/Zone");

class RechargeController {
    async index({ view }) {
        const devices = await Database.table("devices")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");


        const tot = await Database.table("devices")
            .getCount();
        const tot_actif = await Database.table("devices")
            .where({
                is_activated: 1,
            })
            .getCount()

        const free = await Database.table("devices")
            .where({
                connexion_type: 'FREE',
            })
            .getCount()
        const orange = await Database.table("devices")
            .where({
                connexion_type: 'ORANGE',
            })
            .getCount()
        const tot_inactif = await Database.table("devices")
            .where({
                is_activated: 0,
            })
            .getCount()
        const recharge = await Database.table("recharges")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");

        return view.render("recharges.index", {
            recharges: recharge,
            devices: devices,
            tot: tot,
            tot_actif: tot_actif,
            tot_inactif: tot_inactif,
            orange: orange,
            free: free,
        });
    }

    async create({ response, request }) {
        const data = request.only(["amount", "device_id", "date_pay", "date_end"]);
        const device = await Device.find(data.device_id);

        data.device_id = device.id;
        data.device_number = device.phone;
        data.vehicule_id = device.vehicule_id;
        data.vehicule_matricule = device.vehicule_matricule;
        data.connexion_type = device.connexion_type;
        data.connexion_img = device.connexion_img;
        data.operator_id = device.operator_id;
        data.operator_name = device.operator_name;
        data.companie_id = device.companie_id;
        data.companie_name = device.companie_name;
        data.zone_id = device.zone_id;
        data.zone_name = device.zone_name;
        await Recharge.create(data);

        return response.redirect("back");
    }
}

module.exports = RechargeController