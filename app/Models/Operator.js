'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Operator extends Model {


    vehicules() {
        return this.hasMany('App/Models/Vehicule', 'id', 'operator_id');
    }

    devices() {
        return this.hasMany('App/Models/Device', 'id', 'operator_id');
    }

    subscriptions() {
        return this.hasMany('App/Models/Subscription', 'id', 'operator_id');
    }

    recharges() {
        return this.hasMany('App/Models/Recharge', 'id', 'operator_id');
    }

    services() {
        return this.hasMany('App/Models/Service', 'id', 'operator_id');
    }
    dotations() {
        return this.hasMany('App/Models/Dotation', 'id', 'operator_id');
    }
}

module.exports = Operator