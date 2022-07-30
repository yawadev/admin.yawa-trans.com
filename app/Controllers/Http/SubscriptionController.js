'use strict'
const Database = use("Database");
const { validateAll } = use("Validator");
const Helpers = use("Helpers");
const Vehicule = use("App/Models/Vehicule");
const Operator = use("App/Models/Operator");
const Subscription = use("App/Models/Subscription");
const Companie = use("App/Models/Companie");
const Licence = use("App/Models/Licence");

class SubscriptionController {
    async invoice({ view, params }) {
        const companie = await Companie.find(params.id)
        const subscriptions = await Database.table("subscriptions")
            .where({
                companie_id: params.id,
            })
            .orderBy("id", "desc");
        const vehicules = await Database.table("vehicules")
            .where({
                companie_id: params.id,
            })
            .orderBy("id", "desc");

        const tot = await Database.table("subscriptions")
            .where({
                companie_id: params.id,
            })
            .getCount();
        const tot_pay = await Database.table("subscriptions")
            .where({
                payement_status: 1,
                companie_id: params.id,
            })
            .getCount()
        const tot_reliquat = await Database.table("subscriptions")
            .where({
                payement_status: 2,
                companie_id: params.id,
            })
            .getCount()
        const tot_inpay = await Database.table("subscriptions")
            .where({
                payement_status: 0,
                companie_id: params.id,
            })
            .getCount()
        return view.render("subscriptions.invoice", {
            subscriptions: subscriptions,
            tot: tot,
            vehicules: vehicules,
            tot_pay: tot_pay,
            companie: companie,
            tot_reliquat: tot_reliquat,
            tot_inpay: tot_inpay,
        });
    }
    async index({ view }) {
        const subscriptions = await Database.table("subscriptions")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");
        const vehicules = await Database.table("vehicules")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");
        const licences = await Database.table("licences")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");



        const tot = await Database.table("subscriptions")
            .getCount();
        const tot_pay = await Database.table("subscriptions")
            .where({
                payement_status: 1,
            })
            .getCount()
        const tot_reliquat = await Database.table("subscriptions")
            .where({
                payement_status: 2,
            })
            .getCount()
        const tot_inpay = await Database.table("subscriptions")
            .where({
                payement_status: 0,
            })
            .getCount()
        return view.render("subscriptions.index", {
            subscriptions: subscriptions,
            tot: tot,
            licences: licences,
            vehicules: vehicules,
            tot_pay: tot_pay,
            tot_reliquat: tot_reliquat,
            tot_inpay: tot_inpay,
        });
    }
    async getLicence({ request }) {
        const data = request.only(["vehicule_id"]);
        const vehicule = await Vehicule.find(data.vehicule_id)
        const licence = await Database.table("licences")
            .where({
                companie_id: vehicule.companie_id,
            })
        console.log(licence[0])
        return licence[0].amount

    }

    async view({ params, view }) {
        const subscription = await Subscription.find(params.id)
        const operator = await Operator.find(subscription.operator_id)
        const vehicules = await Database.table("vehicules")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");
        return view.render('subscriptions.view', {
            subscription: subscription,
            operator: operator,
            vehicules: vehicules,
        })
    }
    async create({ response, session, request }) {
        const data = request.only(["vehicule_id", "amount", "mois_pay"]);
        console.log(data);
        const vehicule = await Vehicule.find(data.vehicule_id)
        const licence = await Database.table("licences")
            .where({
                companie_id: vehicule.companie_id,
            })
        const d = new Date();
        var options2 = {
            year: "numeric",
        };
        var options3 = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        };
        const today = new Intl.DateTimeFormat("fr", options3).format(d);
        const year = new Intl.DateTimeFormat("fr", options2).format(d);

        console.log(data);
        const device = await Database.table("devices")
            .where({
                vehicule_id: vehicule.id,
            })
        data.operator_id = vehicule.operator_id;
        data.zone_id = vehicule.zone_id;
        data.companie_id = vehicule.companie_id;
        data.operator_name = vehicule.operator_name;
        data.companie_name = vehicule.companie_name;
        data.device_id = device[0].id;
        data.zone_name = vehicule.zone_name;
        if (data.mois_pay === 'JANVIER') {
            data.date_end = '08/01/' + year;
            data.an_pay = '01/' + year;
            data.qrcode = data.companie_id + '' + data.device_id + '01' + year;

        } else if (data.mois_pay === 'FEVRIER') {
            data.date_end = '08/02/' + year;
            data.an_pay = '02/' + year;
            data.qrcode = data.companie_id + '' + data.device_id + '02' + year;

        } else if (data.mois_pay === 'MARS') {
            data.date_end = '08/03/' + year;
            data.an_pay = '03/' + year;
            data.qrcode = data.companie_id + '' + data.device_id + '03' + year;

        } else if (data.mois_pay === 'AVRIL') {
            data.date_end = '08/04/' + year;
            data.an_pay = '04/' + year;
            data.qrcode = data.companie_id + '' + data.device_id + '04' + year;

        } else if (data.mois_pay === 'MAI') {
            data.date_end = '08/05/' + year;
            data.an_pay = '05/' + year;
            data.qrcode = data.companie_id + '' + data.device_id + '05' + year;

        } else if (data.mois_pay === 'JUIN') {
            data.date_end = '08/06/' + year;
            data.an_pay = '06/' + year;
            data.qrcode = data.companie_id + '' + data.device_id + '06' + year;

        } else if (data.mois_pay === 'JUILLET') {
            data.date_end = '08/07/' + year;
            data.an_pay = '07/' + year;
            data.qrcode = data.companie_id + '' + data.device_id + '07' + year;

        } else if (data.mois_pay === 'AOUT') {
            data.date_end = '08/08/' + year;
            data.an_pay = '08/' + year;
            data.qrcode = data.companie_id + '' + data.device_id + '08' + year;

        } else if (data.mois_pay === 'SEPTEMBRE') {
            data.date_end = '08/09/' + year;
            data.an_pay = '09/' + year;
            data.qrcode = data.companie_id + '' + data.device_id + '09' + year;

        } else if (data.mois_pay === 'OCTOBRE') {
            data.date_end = '08/10/' + year;
            data.an_pay = '10/' + year;
            data.qrcode = data.companie_id + '' + data.device_id + '10' + year;

        } else if (data.mois_pay === 'NOVEMBRE') {
            data.date_end = '08/11/' + year;
            data.an_pay = '11/' + year;
            data.qrcode = data.companie_id + '' + data.device_id + '11' + year;

        } else {
            data.date_end = '08/12/' + year;
            data.an_pay = '12/' + year;
            data.qrcode = data.companie_id + '' + data.device_id + '12' + year;

        }
        data.mois_pay = data.mois_pay + ' ' + year;
        data.date_created = today;
        data.vehicule_matricule = vehicule.matricule;
        data.device_number = device[0].phone;
        data.licence_id = licence[0].id;
        const save = await Subscription.create(data);
        if (save) {
            session.flash({
                notification: data.vehicule_matricule + " du mois de " + data.mois_pay + " a ajouté avec succès!",
            });
        }
        return response.redirect("back");
    }

    async update({ response, session, params, request }) {
        const subscription = await Subscription.find(params.id);
        subscription.merge(
            request.only(["vehicule_id", "amount", "mois_pay"])
        );

        console.log(subscription)
        const vehicule = await Vehicule.find(subscription.vehicule_id)
        const licence = await Database.table("licences")
            .where({
                companie_id: vehicule.companie_id,
            })
        const d = new Date();
        var options2 = {
            year: "numeric",
        };
        var options3 = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        };
        const today = new Intl.DateTimeFormat("fr", options3).format(d);
        const year = new Intl.DateTimeFormat("fr", options2).format(d);

        console.log(subscription);
        const device = await Database.table("devices")
            .where({
                vehicule_id: vehicule.id,
            })
        subscription.operator_id = vehicule.operator_id;
        subscription.zone_id = vehicule.zone_id;
        subscription.companie_id = vehicule.companie_id;
        subscription.operator_name = vehicule.operator_name;
        subscription.companie_name = vehicule.companie_name;
        subscription.device_id = device[0].id;
        subscription.zone_name = vehicule.zone_name;
        if (subscription.mois_pay === 'JANVIER') {
            subscription.date_end = '08/01/' + year;
            subscription.an_pay = '01/' + year;
            subscription.qrcode = subscription.companie_id + '' + subscription.device_id + '01' + year;

        } else if (subscription.mois_pay === 'FEVRIER') {
            subscription.date_end = '08/02/' + year;
            subscription.an_pay = '02/' + year;
            subscription.qrcode = subscription.companie_id + '' + subscription.device_id + '02' + year;

        } else if (subscription.mois_pay === 'MARS') {
            subscription.date_end = '08/03/' + year;
            subscription.an_pay = '03/' + year;
            subscription.qrcode = subscription.companie_id + '' + subscription.device_id + '03' + year;

        } else if (subscription.mois_pay === 'AVRIL') {
            subscription.date_end = '08/04/' + year;
            subscription.an_pay = '04/' + year;
            subscription.qrcode = subscription.companie_id + '' + subscription.device_id + '04' + year;

        } else if (subscription.mois_pay === 'MAI') {
            subscription.date_end = '08/05/' + year;
            subscription.an_pay = '05/' + year;
            subscription.qrcode = subscription.companie_id + '' + subscription.device_id + '05' + year;

        } else if (data.mois_pay === 'JUIN') {
            subscription.date_end = '08/06/' + year;
            subscription.an_pay = '06/' + year;
            subscription.qrcode = subscription.companie_id + '' + subscription.device_id + '06' + year;

        } else if (subscription.mois_pay === 'JUILLET') {
            subscription.date_end = '08/07/' + year;
            subscription.an_pay = '07/' + year;
            subscription.qrcode = subscription.companie_id + '' + subscription.device_id + '07' + year;

        } else if (subscription.mois_pay === 'AOUT') {
            subscription.date_end = '08/08/' + year;
            subscription.an_pay = '08/' + year;
            subscription.qrcode = subscription.companie_id + '' + subscription.device_id + '08' + year;

        } else if (subscription.mois_pay === 'SEPTEMBRE') {
            subscription.date_end = '08/09/' + year;
            subscription.an_pay = '09/' + year;
            subscription.qrcode = subscription.companie_id + '' + subscription.device_id + '09' + year;

        } else if (subscription.mois_pay === 'OCTOBRE') {
            subscription.date_end = '08/10/' + year;
            subscription.an_pay = '10/' + year;
            subscription.qrcode = subscription.companie_id + '' + subscription.device_id + '10' + year;

        } else if (subscription.mois_pay === 'NOVEMBRE') {
            subscription.date_end = '08/11/' + year;
            subscription.an_pay = '11/' + year;
            subscription.qrcode = subscription.companie_id + '' + subscription.device_id + '11' + year;

        } else {
            subscription.date_end = '08/12/' + year;
            subscription.an_pay = '12/' + year;
            subscription.qrcode = subscription.companie_id + '' + subscription.device_id + '12' + year;

        }
        subscription.mois_pay = subscription.mois_pay + ' ' + year;
        subscription.date_created = today;
        subscription.vehicule_matricule = vehicule.matricule;
        subscription.device_number = device[0].phone;
        subscription.licence_id = licence[0].id;
        const save = await subscription.save();
        if (save) {
            session.flash({
                notification: subscription.vehicule_matricule + " du mois de " + subscription.mois_pay + " a été modifié avec succès!",
            });
        }
        return response.redirect("back");
    }
    async paiement({ response, session, params, request }) {
        const subscription = await Subscription.find(params.id);
        subscription.merge(
            request.only(["payment_methode", "payment_code", "date_pay"])
        );

        const d = new Date();

        var options3 = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        };
        const today = new Intl.DateTimeFormat("fr", options3).format(d);

        subscription.date_pay = today;
        subscription.payement_status = 1;
        const save = await subscription.save();
        if (save) {
            session.flash({
                notification: subscription.vehicule_matricule + " du mois de " + subscription.mois_pay + " a été payé avec succès!",
            });
        }
        return response.redirect("back");
    }
}

module.exports = SubscriptionController