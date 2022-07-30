"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ServiceSchema extends Schema {
    up() {
        this.create("services", (table) => {
            table.increments();
            table.string("seller", 254);
            table.integer('device_id').notNullable();
            table.string("device_number");
            table.integer("vehicule_id").notNullable();
            table.string("vehicle_matricule");
            table.integer('line_id').notNullable();
            table.string("line_name");
            table.string("start_time");
            table.string("end_time");
            table.integer("start_miles");
            table.integer("end_miles");
            table.integer("tickets_count").defaultTo(0);
            table.integer("rotations_count").defaultTo(0);
            table.float("tickets_sum", 8, 2).defaultTo(0);
            table.float("service_expense", 8, 2).defaultTo(0);
            table.float("service_balance", 8, 2).defaultTo(0);
            table.string("service_date");
            table.integer('operator_id').notNullable();
            table.integer("operator_name");
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
        this.drop("services");
    }
}

module.exports = ServiceSchema;