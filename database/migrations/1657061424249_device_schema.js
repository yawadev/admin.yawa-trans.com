"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DeviceSchema extends Schema {
    up() {
        this.create("devices", (table) => {
            table.increments();
            table.string("phone", 254).notNullable();
            table.string("password", 254).defaultTo(13456);
            table.string("connexion_type", 254).notNullable();
            table.string("connexion_img", 254);
            table.integer("vehicle_id").notNullable();
            table.string("vehicule_matricule");
            table.integer('operator_id').notNullable();
            table.string("operator_name");
            table.integer('companie_id').notNullable();
            table.string("companie_name");
            table.integer("zone_id");
            table.string("zone_name");
            table.boolean("is_activated").defaultTo(true);
            table.boolean("is_deleted").defaultTo(false);
            table.timestamps();
        });
    }

    down() {
        this.drop("devices");
    }
}

module.exports = DeviceSchema;