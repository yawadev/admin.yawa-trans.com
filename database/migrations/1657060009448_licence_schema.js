"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LicenceSchema extends Schema {
    up() {
        this.create("licences", (table) => {
            table.increments();
            table.string("invoice_type");
            table.integer("amount").defaultTo(0);
            table.integer("dotation_bobines").defaultTo(0);
            table.integer("companie_id");
            table.string("companie_name");
            table.integer("zone_id");
            table.string("zone_name");
            table.string("date_created");
            table.string("is_activated").defaultTo('1');
            table.boolean("is_deleted").defaultTo(false);
            table.timestamps();
        });
    }

    down() {
        this.drop("licences");
    }
}

module.exports = LicenceSchema;