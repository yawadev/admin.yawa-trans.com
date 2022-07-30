"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CompanySchema extends Schema {
    up() {
        this.create("companies", (table) => {
            table.increments();
            table.string("categorie", 255).defaultTo('OPERATEUR BUS TATA');
            table.string("name", 255).notNullable().unique();
            table.string("contact_name", 254).notNullable();
            table.string("contact_phone", 254).notNullable();
            table.string("contact_email", 254);
            table.integer("vehicule_count").defaultTo(0);
            table.integer('zone_id').notNullable();
            table.string("zone_name", 255);
            table.string("is_activated").defaultTo('1');
            table.boolean("is_deleted").defaultTo(false);

            table.timestamps();
        });
    }

    down() {
        this.drop("companies");
    }
}

module.exports = CompanySchema;