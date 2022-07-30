'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommandeSchema extends Schema {
    up() {
        this.create('commandes', (table) => {
            table.increments()
            table.string("qrcode");
            table.integer("amount").defaultTo(0);
            table.string("payment_methode").defaultTo('WAVE');
            table.string("date_created");
            table.integer("supplier_id");
            table.string("supplier_name");
            table.string("payement_status").defaultTo('0');
            table.boolean("is_deleted").defaultTo(false);
            table.timestamps()
        })
    }

    down() {
        this.drop('commandes')
    }
}

module.exports = CommandeSchema