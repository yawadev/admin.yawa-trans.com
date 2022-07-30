'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RechargeSchema extends Schema {
    up() {
        this.create('recharges', (table) => {
            table.increments()
            table.integer("device_id").notNullable();
            table.string("device_number");
            table.integer("vehicule_id").notNullable();
            table.string("vehicule_matricule");
            table.integer("amount").defaultTo(2000);
            table.string("connexion_type");
            table.string("connexion_img", 254);
            table.string("date_pay");
            table.string("date_end");
            table.string("mois_pay");
            table.string("an_pay");
            table.integer('operator_id').notNullable();
            table.string("operator_name");
            table.string("companie_name", 254);
            table.integer("companie_id");
            table.integer("zone_id");
            table.string("zone_name");
            table.string("is_activated").defaultTo('1');
            table.boolean("is_deleted").defaultTo(false);
            table.timestamps()
        })
    }

    down() {
        this.drop('recharges')
    }
}

module.exports = RechargeSchema