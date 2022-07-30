'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Device extends Model {
    services() {
        return this.hasMany('App/Models/Service', 'id', 'device_id');
    }

    recharges() {
        return this.hasMany('App/Models/Recharge', 'id', 'device_id');
    }

    dotations() {
        return this.hasMany('App/Models/Dotation', 'id', 'device_id');
    }
}

module.exports = Device