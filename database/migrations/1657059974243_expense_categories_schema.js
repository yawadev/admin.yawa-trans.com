"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ExpenseCategoriesSchema extends Schema {
    up() {
        this.create("expense_categories", (table) => {
            table.increments();
            table.string("name", 254);
            table.string("is_activated").defaultTo('1');
            table.boolean("is_deleted").defaultTo(false);
            table.timestamps();
        });
    }

    down() {
        this.drop("expense_categories");
    }
}

module.exports = ExpenseCategoriesSchema;