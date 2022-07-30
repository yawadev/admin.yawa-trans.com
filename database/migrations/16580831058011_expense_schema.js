"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ExpenseSchema extends Schema {
    up() {
        this.create("expenses", (table) => {
            table.increments();
            table.integer("vehicule_id");
            table.integer("line_id");
            table.integer("cat_id");
            table.integer("name");
            table.float("sum", 8, 2).defaultTo(0);
            table.integer('service_id').notNullable();
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
        this.drop("expenses");
    }
}

module.exports = ExpenseSchema;