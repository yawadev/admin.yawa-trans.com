'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Line extends Model {
    services() {
        return this.hasMany('App/Models/Service', 'id', 'line_id');
    }
    rates() {
        return this.hasMany('App/Models/Rate', 'id', 'line_id');
    }
}

module.exports = Line