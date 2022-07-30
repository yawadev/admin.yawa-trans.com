'use strict'
const Database = use("Database");
const Supplier = use("App/Models/Supplier");

class SupplierController {
    async index({ view }) {
        const suppliers = await Database.table("suppliers")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");

        return view.render("suppliers.index", {
            suppliers: suppliers,
        });
    }

    async view({ params, view }) {
        const supplier = await Supplier.find(params.id);
        const commandes = await Database.table("commandes")
            .where({
                supplier_id: supplier.id,
                is_deleted: 0,
            })
            .orderBy("id", "desc");

        return view.render("suppliers.view", {
            supplier: supplier,
            commandes: commandes,
        });
    }
    async create({ response, session, request }) {
        const data = request.only(["name", "adresse", "contact_phone", "unit_price"]);
        console.log(data);
        const save = await Supplier.create(data);
        if (save) {
            session.flash({
                notification: data.name + " ajouté avec succès!",
            });
        }
        return response.redirect("back");
    }
    async update({ params, request, response, session }) {

        const supplier = await Supplier.find(params.id);
        supplier.merge(
            request.only(["name", "adresse", "contact_phone", "unit_price"])
        );
        const save = await supplier.save();
        if (save) {
            session.flash({
                notification: supplier.name + " modifié avec succès!",
            });
        }
        return response.redirect("back");
    }

    async delete({ response, params, session }) {
        const supplier = await Supplier.find(params.id);

        const del = await supplier.delete()

        if (del) {
            session.flash({
                notification: "L'enregistrement a été supprimé définitivement dans la base de données!",
            });
        }
        return response.redirect("back");
    }
}

module.exports = SupplierController