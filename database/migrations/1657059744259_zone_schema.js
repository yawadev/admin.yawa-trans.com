"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ZoneSchema extends Schema {
    up() {
        this.create("zones", (table) => {
            table.increments();
            table.string("name");
            table.string("pays");
            table.string("is_activated").defaultTo('1');
            table.boolean("is_deleted").defaultTo(false);

            table.timestamps();
        });
    }

    down() {
        this.drop("zones");
    }
}

module.exports = ZoneSchema;