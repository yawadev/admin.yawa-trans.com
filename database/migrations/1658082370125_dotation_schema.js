'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DotationSchema extends Schema {
    up() {
        this.create('dotations', (table) => {
            table.increments()
            table.integer("device_id").notNullable();
            table.string("device_number");
            table.integer("vehicule_id").notNullable();
            table.string("vehicule_matricule");
            table.integer("dotation_qut").defaultTo(0);
            table.integer("delivered_qut").defaultTo(0);
            table.string("delivered_at");
            table.string("delivered_to");
            table.string("delivered_by");
            table.string("mois_pay");
            table.string("an_pay");
            table.integer('companie_id');
            table.integer('operator_id').notNullable();
            table.string("operator_name");
            table.string("companie_name", 254);
            table.integer("zone_id");
            table.string("zone_name");
            table.timestamps()
        })
    }

    down() {
        this.drop('dotations')
    }
}

module.exports = DotationSchema