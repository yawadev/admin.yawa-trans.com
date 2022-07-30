"use strict";

class RedirectIfAuthenticated {
    async handle({ auth, response }, next) {
        try {
            await auth.check();

            return response.redirect("/");
        } catch (e) {
            console.log("You are not logged in");
        }

        await next();
    }
}

module.exports = RedirectIfAuthenticated;