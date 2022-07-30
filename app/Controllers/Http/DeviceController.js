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

class DeviceController {
    async index({ view }) {
        const devices = await Database.table("devices")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");
        const vehicule = await Database.table("vehicules")
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
        return view.render("settings.devices.index", {
            devices: devices,
            vehicule: vehicule,
            tot: tot,
            tot_actif: tot_actif,
            tot_inactif: tot_inactif,
            orange: orange,
            free: free,
        });
    }
    async view({ params, view }) {
        const device = await Device.find(params.id);
        const recharge = await Database.table("recharges")
            .where({
                device_id: device.id,
                is_deleted: 0,
            })
            .orderBy("id", "desc");
        const vehicule = await Database.table("vehicules")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");
        return view.render("settings.devices.view", {
            device: device,
            recharge: recharge,
            vehicule: vehicule,
        });
    }
    async create({ response, session, request }) {
        const data = request.only(["phone", "is_activated", "connexion_type", "vehicule_id"]);
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
    async update({ params, request, response, session }) {

        const device = await Device.find(params.id);
        device.merge(
            request.only(["phone", "connexion_type", "vehicule_id"])
        );


        const vehicule = await Vehicule.find(device.vehicule_id)
        if (device.connexion_type === 'ORANGE') {
            device.connexion_img = 'assets/images/connexion/orange.png'
        } else {
            device.connexion_img = 'assets/images/connexion/free.png'

        }
        device.vehicule_matricule = vehicule.matricule;
        device.operator_id = vehicule.operator_id;
        device.operator_name = vehicule.operator_name;
        device.companie_id = vehicule.companie_id;
        device.companie_name = vehicule.companie_name;
        device.zone_id = vehicule.zone_id;
        device.zone_name = vehicule.zone_name;
        const save = await device.save();
        if (save) {
            session.flash({
                notification: device.phone + " modifié avec succès!",
            });
        }
        return response.redirect("back");
    }

    async recharge({ response, params, request }) {
        const device = await Device.find(params.id);
        const data = request.only(["amount", "date_pay", "date_end"]);

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

    async blocked({ response, params, session, request }) {
        const device = await Device.find(params.id);
        device.merge(
            request.only([
                "is_activated"
            ])
        );
        const save = await device.save();

        if (save) {
            session.flash({
                notification: "L'enregistrement a été bloqué !",
            });
        }
        return response.redirect("back");
    }
    async reactived({ response, params, session, request }) {
        const device = await Device.find(params.id);
        device.merge(
            request.only([
                "is_activated"
            ])
        );
        const save = await device.save();

        if (save) {
            session.flash({
                notification: "L'enregistrement a été réactivé !",
            });
        }
        return response.redirect("back");
    }

    async rDel({ response, params, session }) {
        const recharge = await Recharge.find(params.id)

        const del = await recharge.delete()

        if (del) {
            session.flash({
                notification: "L'enregistrement a été supprimé définitivement dans la base de données!",
            });
        }
        return response.redirect("back");
    }

    async delete({ response, params, session }) {
        const devices = await Device.find(params.id)

        const del = await devices.delete()

        if (del) {
            session.flash({
                notification: "L'enregistrement a été supprimé définitivement dans la base de données!",
            });
        }
        return response.redirect("back");
    }
}

module.exports = DeviceController