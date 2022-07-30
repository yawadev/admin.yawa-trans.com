'use strict'
const Database = use("Database");
const Supplier = use("App/Models/Supplier");
const Article = use("App/Models/Article");
const Commande = use("App/Models/Commande");
const Stock = use("App/Models/Stock");

class CommandeController {
    async index({ view }) {
        const commandes = await Database.table("commandes")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");
        const suppliers = await Database.table("suppliers")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");
        return view.render("commandes.index", {
            commandes: commandes,
            suppliers: suppliers,
        });
    }

    async view({ params, view }) {
        const commande = await Commande.find(params.id);
        const art = await Database.table("articles")
            .where({
                commande_id: commande.id,
            })
            .orderBy("id", "desc");
        const supplier = await Supplier.find(commande.supplier_id);
        const suppliers = await Database.table("suppliers")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");
        return view.render("commandes.view", {
            art: art,
            commande: commande,
            supplier: supplier,
            suppliers: suppliers,
        });
    }

    async create({ response, session, request }) {
        const data = request.only(["supplier_id", "date_created"]);
        console.log(data);
        const supplier = await Supplier.find(data.supplier_id);
        data.supplier_name = supplier.name;
        const save = await Commande.create(data);
        if (save) {
            session.flash({
                notification: data.name + " ajouté avec succès!",
            });
        }
        return response.redirect("/commandes/view/" + save.id);
    }

    async items({ params, response, session, request }) {
        const data = request.only(["name", "qut", "price"]);
        console.log(data);
        const commande = await Commande.find(params.id);
        const supplier = await Supplier.find(commande.supplier_id);
        data.commande_id = commande.id;
        data.amount = Number(data.qut) * Number(supplier.unit_price);
        data.price = Number(supplier.unit_price);
        const save = await Article.create(data);
        if (save) {
            const tot = await Database.table("articles")
                .where({
                    commande_id: commande.id,
                }).getSum("amount");
            const quant = await Database.table("articles")
                .where({
                    commande_id: commande.id,
                }).getSum("qut");

            const stock = await Stock.find(1)
            const newStock = Number(quant) + Number(stock.qut)
            stock.qut = newStock
            stock.save()

            commande.qut = quant
            commande.amount = tot
            commande.save()

            session.flash({
                notification: data.name + " ajouté avec succès!",
            });
        }
        return response.redirect("back");
    }
    async paiement({ response, params, request }) {
        const commande = await Commande.find(params.id);
        commande.merge(
            request.only(["payment_methode", "date_pay"])
        );

        commande.payement_status = 1;
        await commande.save();

        return response.redirect("back");
    }
    async update({ params, request, response, session }) {

        const commande = await Commande.find(params.id);
        commande.merge(
            request.only(["supplier_id", "date_created"])
        );
        const save = await commande.save();
        if (save) {
            session.flash({
                notification: commande.supplier_name + " modifié avec succès!",
            });
        }
        return response.redirect("back");
    }

    async delete({ response, params, session }) {
        const commande = await Commande.find(params.id);
        const quant = await Database.table("articles")
            .where({
                commande_id: commande.id,
            }).getSum("qut");

        const stock = await Stock.find(1)
        const newStock = Number(stock.qut) - Number(quant)
        stock.qut = newStock
        stock.save()
        const del = await Article
            .query()
            .where('commande_id', commande.id)
            .delete()


        if (del) {
            await commande.delete()
            session.flash({
                notification: "L'enregistrement a été supprimé définitivement dans la base de données!",
            });
        }
        return response.redirect("back");
    }
}

module.exports = CommandeController