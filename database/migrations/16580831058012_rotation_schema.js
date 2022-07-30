"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RotationSchema extends Schema {
    up() {
        this.create("rotations", (table) => {
            table.increments();
            table.integer('service_id').notNullable();
            table.integer("line_id");
            table.string("line_name");
            table.string("leaving_place");
            table.string("arrived_place");
            table.string("leaving_time");
            table.string("arrived_time");
            table.string("duration");
            table.integer("device_id");
            table.string("device_number");
            table.integer("vehicule_id");
            table.string("vehicule_matricule");
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
        this.drop("rotations");
    }
}

module.exports = RotationSchema;