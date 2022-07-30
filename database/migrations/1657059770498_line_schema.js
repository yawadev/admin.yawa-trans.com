"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LineSchema extends Schema {
    up() {
        this.create("lines", (table) => {
            table.increments();
            table.string("name", 254);
            table.string("point_a", 254);
            table.string("point_b", 254);
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
        this.drop("lines");
    }
}

module.exports = LineSchema;