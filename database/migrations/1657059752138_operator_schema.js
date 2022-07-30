"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OperatorSchema extends Schema {
    up() {
        this.create("operators", (table) => {
            table.increments();
            table.string("type", 255).defaultTo('OPERATEUR BUS TATA');
            table.string("name", 255).notNullable();
            table.string("phone", 254).notNullable();
            table.string("email", 254);
            table.integer("vehicule_count").defaultTo(0);
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
        this.drop("operators");
    }
}

module.exports = OperatorSchema;