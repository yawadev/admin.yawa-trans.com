"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TrashSchema extends Schema {
    up() {
        this.create("trashs", (table) => {
            table.increments();
            table.integer("deleted_id");
            table.string("name", 255);
            table.string("description", 255);
            table.string("table", 255);
            table.integer("auteur_id");
            table.string("auteur_name");
            table.boolean("is_restored").defaultTo(false);
            table.integer("companie_id");
            table.timestamps();
        });
    }

    down() {
        this.drop("trashes");
    }
}

module.exports = TrashSchema;