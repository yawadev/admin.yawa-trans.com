'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StockSchema extends Schema {
    up() {
        this.create('stocks', (table) => {
            table.increments()
            table.string("art_name", 255).defaultTo('BOBINES');
            table.float("qut", 8, 2).defaultTo(0);
            table.timestamps()
        })
    }

    down() {
        this.drop('stocks')
    }
}

module.exports = StockSchema