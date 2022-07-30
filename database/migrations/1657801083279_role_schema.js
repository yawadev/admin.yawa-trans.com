'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleSchema extends Schema {
    up() {
        this.create('roles', (table) => {
            table.increments()
            table.string("name", 254).notNullable();
            table.string("code", 254);
            table.boolean("is_activated").defaultTo(true);
            table.boolean("is_deleted").defaultTo(false);
            table.timestamps()
        })
    }

    down() {
        this.drop('roles')
    }
}

module.exports = RoleSchema