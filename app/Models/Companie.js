'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Companie extends Model {

    vehicules() {
        return this.hasMany('App/Models/Vehicule', 'id', 'companie_id');
    }
    operators() {
        return this.hasMany('App/Models/Operator', 'id', 'companie_id');
    }
    lines() {
        return this.hasMany('App/Models/Line', 'id', 'companie_id');
    }

    custumers() {
        return this.hasMany('App/Models/Custumer', 'id', 'companie_id');
    }

    subscriptions() {
        return this.hasMany('App/Models/Subscription', 'id', 'companie_id');
    }
    services() {
        return this.hasMany('App/Models/Service', 'id', 'companie_id');
    }


}

module.exports = Companie