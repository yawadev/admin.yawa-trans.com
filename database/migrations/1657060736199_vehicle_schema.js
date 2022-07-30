"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class VehicleSchema extends Schema {
    up() {
        this.create("vehicules", (table) => {
            table.increments();
            table.string("type", 255).defaultTo('BUS TATA');
            table.string("matricule", 255).notNullable();
            table.integer('operator_id').unsigned().notNullable();
            table.foreign('operator_id').references('id').inTable('operators');
            table.string("operator_name");
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
        this.drop("vehicles");
    }
}

module.exports = VehicleSchema;