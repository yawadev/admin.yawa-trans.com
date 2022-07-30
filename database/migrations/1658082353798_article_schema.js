'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticleSchema extends Schema {
    up() {
        this.create('articles', (table) => {
            table.increments()
            table.integer("commande_id");
            table.string("name", 255).defaultTo('BOBINES');
            table.float("qut", 8, 2).defaultTo(0);
            table.float("price", 8, 2).defaultTo(0);
            table.float("amount", 8, 2).defaultTo(0);
            table.timestamps()
        })
    }

    down() {
        this.drop('articles')
    }
}

module.exports = ArticleSchema