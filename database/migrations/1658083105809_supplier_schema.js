'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SupplierSchema extends Schema {
    up() {
        this.create('suppliers', (table) => {
            table.increments();
            table.string("name", 255).notNullable();
            table.string("adresse", 254);
            table.string("contact_name", 254).notNullable();
            table.string("contact_phone", 254).notNullable();
            table.integer("unit_price").defaultTo(1);
            table.boolean("status").defaultTo(1);
            table.boolean("is_deleted").defaultTo(0);
            table.timestamps()
        })
    }

    down() {
        this.drop('suppliers')
    }
}

module.exports = SupplierSchema