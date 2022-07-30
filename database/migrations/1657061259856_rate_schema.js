"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RateSchema extends Schema {
    up() {
        this.create("rates", (table) => {
            table.increments();
            table.string("name", 254).notNullable();
            table.integer("price").defaultTo(0);
            table.string("section", 254);
            table.integer('line_id').notNullable();
            table.integer("companie_id");
            table.string("companie_name");
            table.integer("zone_id");
            table.string("zone_name");
            table.string("is_activated").defaultTo('1');
            table.boolean("is_deleted").defaultTo(false);
            table.timestamps();
        });
    }

    down() {
        this.drop("rates");
    }
}

module.exports = RateSchema;