"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CustumerSchema extends Schema {
    up() {
        this.create("custumers", (table) => {
            table.increments();
            table.string("card_uuid", 254);
            table.string("name", 254).notNullable();
            table.string("phone", 254).notNullable().unique();
            table.string("email", 254).unique();
            table.string("cni", 254).notNullable().unique();
            table.string("activity", 254);
            table.string("avatar").defaultTo("/assets/images/users/h.png");
            table.integer("balance").defaultTo(0);
            table.integer('companie_id').notNullable();
            table.string("companie_name");
            table.integer("zone_id");
            table.string("zone_name");
            table.string("is_activated").defaultTo('1');
            table.boolean("is_deleted").defaultTo(false);
            table.timestamps();
        });
    }

    down() {
        this.drop("custumers");
    }
}

module.exports = CustumerSchema;