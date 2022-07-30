'use strict'
const Stock = use("App/Models/Stock");

class InventoryController {
    async index({ view }) {
        const stocks = await Database.table("stocks")
            .where({
                is_deleted: 0,
            })
            .orderBy("id", "desc");

        return view.render("stocks.index", {
            stocks: stocks,
        });
    }
    async update({ params, request, response, session }) {

        const stocks = await Stock.find(params.id);
        stocks.merge(
            request.only(["art_name", "qut"])
        );
        const save = await stocks.save();
        if (save) {
            session.flash({
                notification: stocks.art_name + " modifié avec succès!",
            });
        }
        return response.redirect("back");
    }
    async delete({ response, params, session }) {
        const stocks = await Stock.find(params.id);

        const del = await stocks.delete()

        if (del) {
            session.flash({
                notification: "L'enregistrement a été supprimé définitivement dans la base de données!",
            });
        }
        return response.redirect("back");
    }
}

module.exports = InventoryController