"use strict";
const User = use("App/Models/User");
const Database = use("Database");
const { validateAll } = use("Validator");
const Helpers = use("Helpers");
const Hash = use("Hash");

class UserController {
    async index({ request, view, response, auth }) {
        const user = await auth.getUser();

        const users = await Database.table("users");
        return view.render("users.index", {
            users: users,
        });
    }
    async ajax() {
        const users = await Database.table("users");
        console.log(users)
        return users
    }
    async show({ request, view, response, auth }) {}

    async edit({ request, view, response, auth }) {}

    async singup({ response }) {
        const operators = await Database.table('operators')
            .where({
                is_deleted: 0
            })
        console.log(operators)
        var data;
        // for (let index = 0; index < operators.length; index++) {
        //     const element = operators[index];
        //     data = {
        //         name: element.name,
        //         username: element.phone,
        //         password: "123456",
        //         email: element.phone + "@yawa-trans.com",
        //         role_id: 4,
        //         role_name: "Opérateur",
        //         operator_id: element.id,
        //         companie_id: element.companie_id,
        //         companie_name: element.companie_name,
        //         zone_id: element.zone_id,
        //         zone_name: element.zone_name,
        //     };
        //     await User.create(data);
        //     console.log(data)
        // }



        return response.redirect("back");
    }

    async blocked({ request, view, response, auth }) {}

    async delete({ request, view, response, auth }) {}
}

module.exports = UserController;