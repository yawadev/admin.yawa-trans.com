'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Service extends Model {
    rotations() {
        return this.hasMany('App/Models/Rate', 'id', 'service_id');
    }

    expenses() {
        return this.hasMany('App/Models/Expense', 'id', 'service_id');
    }

    tickets() {
        return this.hasMany('App/Models/Ticket', 'id', 'service_id');
    }
}

module.exports = Service