"use strict";
const Database = use("Database");

class AuthController {
    async index({ view }) {
        return view.render("auth.login");
    }
    async login({ request, response, auth, session }) {
        const { username, password } = request.all();

        const user = await Database.table("users").where({
            username: username,
            is_activated: 1,
        });
        console.log(auth);
        if (user.length >= 1) {
            try {
                await auth.check();
            } catch (error) {
                try {
                    await auth.attempt(username, password);
                    //const ip = request.ip();
                    //await this.logged(user[0], ip);
                } catch (e) {
                    console.log(e);
                    session.flashExcept(["password"]);
                    session.flash({
                        error: "Oups! Identifiants incorrects.",
                    });
                    return response.redirect("back");
                }
            }
            return response.redirect("/");
        } else {
            session.flash({
                error: "Oups! Votre compte n'existe pas ou a été désactivé. Veillez contacter l'administrateur.",
            });
            return response.redirect("back");
        }
    }
    async destroy({ auth, response }) {
        const user = await auth.getUser();
        const d = new Date();
        var options = {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
            timeZone: "UTC",
        };
        // const now = new Intl.DateTimeFormat("fr", options).format(d);
        // await Database.table("onlines").where("user_id", user.id).update({
        //     heure_fin: now,
        //     status: 0,
        // });
        await auth.logout();
        return response.redirect("/login");
    }

    async logged(user, ip) {
        const d = new Date();
        var options = {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
            timeZone: "UTC",
        };
        const now = new Intl.DateTimeFormat("fr", options).format(d);

        const log = await Database.table("onlines").where("user_id", user.id);
        if (log.length < 1) {
            await Database.table("onlines").insert({
                user_id: user.id,
                username: user.name,
                role: user.role_name,
                heure_debut: now,
                heure_fin: "",
                agence_id: user.agence_id,
                compagny_id: user.compagny_id,
                ip: ip,
                status: 1,
            });
        } else {
            for (let index = 0; index < all_service.length; index++) {
                await Database.table("onlines").where("user_id", user.id).update({
                    heure_fin: now,
                    status: 0,
                });
            }
            await Database.table("onlines").insert({
                user_id: user.id,
                username: user.name,
                role: user.role_name,
                heure_debut: now,
                heure_fin: "",
                agence_id: user.agence_id,
                compagny_id: user.compagny_id,
                ip: ip,
                status: 1,
            });

            return true;
        }
    }
}

module.exports = AuthController;