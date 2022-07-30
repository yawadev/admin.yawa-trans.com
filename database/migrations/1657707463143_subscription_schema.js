'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubscriptionSchema extends Schema {
    up() {
        this.create('subscriptions', (table) => {
            table.increments()
            table.integer("device_id").notNullable();
            table.string("device_number");
            table.integer("vehicule_id").notNullable();
            table.string("vehicule_matricule");
            table.integer("licence_id");
            table.string("qrcode");
            table.integer("amount").defaultTo(0);
            table.string("payment_methode").defaultTo('CASH');
            table.string("payment_code");
            table.string("date_created");
            table.string("date_pay");
            table.string("date_end");
            table.string("mois_pay");
            table.string("an_pay");
            table.integer("duration").defaultTo(0);
            table.integer('companie_id').notNullable();
            table.integer('operator_id').notNullable();
            table.string("operator_name");
            table.string("companie_name", 254);
            table.integer("zone_id");
            table.string("zone_name");
            table.string("payement_status").defaultTo('0');
            table.boolean("is_deleted").defaultTo(false);
            table.timestamps()
        })
    }

    down() {
        this.drop('subscriptions')
    }
}

module.exports = SubscriptionSchema