"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TicketSchema extends Schema {
    up() {
        this.create("tickets", (table) => {
            table.increments();
            table.string("methode").defaultTo('CASH');;
            table.string("card_uuid", 254);
            table.integer("line_id");
            table.integer("rate_id");
            table.integer("rotation_id");
            table.integer("vehicle_id");
            table.integer("qut").defaultTo(1);
            table.integer("price").defaultTo(0);
            table.float("sum", 8, 2).defaultTo(0);
            table.integer('service_id').notNullable();
            table.string("selle_time");
            table.integer("operator_id");
            table.integer("companie_id");
            table.string("companie_name");
            table.integer("zone_id");
            table.string("zone_name");
            table.boolean("is_deleted").defaultTo(false);
            table.timestamps();
        });
    }

    down() {
        this.drop("tickets");
    }
}

module.exports = TicketSchema;