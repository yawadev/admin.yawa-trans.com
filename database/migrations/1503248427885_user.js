"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
    up() {
        this.create("users", (table) => {
            table.increments();
            table.string("name", 255).nullable();
            table.string("username", 80).notNullable().unique();
            table.string("email", 254).notNullable().unique();
            table.string("password", 60).notNullable();
            table.integer("role_id");
            table.string("role_name");
            table.string("avatar").defaultTo("/assets/images/users/h.png");
            table.integer("operator_id").defaultTo(0);
            table.integer("companie_id").defaultTo(0);
            table.string("companie_name", 254).nullable();
            table.integer("zone_id").defaultTo(1);
            table.string("zone_name", 254).nullable();
            table.boolean("is_activated").defaultTo(true);
            table.boolean("is_deleted").defaultTo(false);
            table.timestamps();
        });
    }

    down() {
        this.drop("users");
    }
}

module.exports = UserSchema;