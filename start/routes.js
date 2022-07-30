"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

//Auth routes
Route.group(() => {
    Route.get("/login", "AuthController.index");
    Route.post("/login", "AuthController.login").as("auth.login");
    Route.get("/singup", "UserController.singup");
    Route.post("/recovery", "AuthController.recovery").as("auth.recovery");
});
//Authenticated user routes
Route.group(() => {
    //Auth actions
    Route.get("/logout", "AuthController.destroy").as("auth.logout");
    Route.get("/users", "UserController.index").as("admin.users");
    Route.get("/users/ajax", "UserController.ajax")

    Route.get("/", "DashboardController.index");


    Route.get("reports", "ReportController.index").as("reports");
    Route.post("reports/request", "ReportController.request").as("reports.request");

    //Parametrage


    // zones
    Route.get("setting/zones", "SettingController.zone").as("setting.zones");
    Route.post("setting/zones/create", "SettingController.zoneCreate").as(
        "zones.create"
    );

    //Custumers
    Route.get("custumer/gie", "ClientController.index").as("custumer.gie");
    Route.post("custumer/gie/create", "ClientController.create").as("gie.create");
    Route.get("companies/view/:id", "ClientController.view");
    Route.get("companies/delete/:id", "ClientController.delete");
    Route.put("companies/update/:id", "ClientController.update");
    Route.put("companies/blocked/:id", "ClientController.blocked");
    Route.put("companies/reactived/:id", "ClientController.reactived");

    //Lines
    Route.get("lines", "LineController.index").as("lines");
    Route.post("lines/create", "LineController.create").as("lines.create");
    Route.get("lines/view/:id", "LineController.view");
    Route.get("lines/delete/:id", "LineController.delete");
    Route.put("lines/update/:id", "LineController.update");
    Route.put("lines/rate/:id", "LineController.rate");
    Route.get("lines/delete/rate/:id", "LineController.rateDel");
    Route.put("lines/blocked/:id", "LineController.blocked");
    Route.put("lines/reactived/:id", "LineController.reactived");
    //Licences
    Route.get("licences", "LicenceController.index").as("licences");
    Route.post("licences/create", "LicenceController.create").as("licences.create");
    Route.get("licences/delete/:id", "LicenceController.delete");
    Route.get("licences/blocked/:id", "LicenceController.blocked");
    //Devices
    Route.get("devices", "DeviceController.index").as("devices");
    Route.post("devices/create", "DeviceController.create").as("devices.create");
    Route.post("devices/recharge/create/:id", "DeviceController.recharge");
    Route.get("devices/delete/:id", "DeviceController.delete");
    Route.put("devices/update/:id", "DeviceController.update");
    Route.get("devices/view/:id", "DeviceController.view");
    Route.put("devices/blocked/:id", "DeviceController.blocked");
    Route.get("devices/delete/recharge/:id", "DeviceController.rDel");
    Route.put("devices/reactived/:id", "DeviceController.reactived");
    //Subscription
    Route.get("subscriptions", "SubscriptionController.index").as("subscriptions");
    Route.post("subscriptions/create", "SubscriptionController.create").as("subscriptions.create");
    Route.get("subscriptions/view/:id", "SubscriptionController.view");
    Route.get("subscriptions/delete/:id", "SubscriptionController.delete");
    Route.put("subscriptions/update/:id", "SubscriptionController.update");
    Route.put("subscriptions/blocked/:id", "SubscriptionController.blocked");
    Route.put("subscriptions/reactived/:id", "SubscriptionController.reactived");
    Route.put("subscriptions/paiement/:id", "SubscriptionController.paiement");
    Route.put("subscriptions/reliquat/:id", "SubscriptionController.reliquat");
    Route.get("subscriptions/invoices/:id", "SubscriptionController.invoice");
    Route.post("subscriptions/licence", "SubscriptionController.getLicence");
    //operators
    Route.get("operators", "OperatorController.index").as("operators");
    Route.post("operators/create", "OperatorController.create").as(
        "operators.create"
    );
    Route.get("operators/view/:id", "OperatorController.view");
    Route.get("operators/delete/:id", "OperatorController.delete");
    Route.put("operators/update/:id", "OperatorController.update");
    Route.put("operators/blocked/:id", "OperatorController.blocked");
    Route.put("operators/reactived/:id", "OperatorController.reactived");
    Route.post("operators/vehicule/create/:id", "OperatorController.addBus");
    Route.post("operators/devices/create", "OperatorController.addDevice").as("operators.devices.create");

    //Véhicules
    Route.get("vehicules", "VehiculeController.index").as("vehicules");
    Route.get("vehicule/delete/:id", "VehiculeController.delete");
    Route.get("vehicule/blocked/:id", "VehiculeController.blocked");
    Route.post("vehicules/create", "VehiculeController.create").as(
        "vehicules.create"
    );
    Route.post("vehicule/update/:id", "VehiculeController.update");


    //Services
    Route.get("services", "ServiceController.index").as("services");
    Route.get("services/view/:id", "ServiceController.view");
    Route.get("services/delete/:id", "ServiceController.delete");
    Route.get("services/list/:id", "ServiceController.list");
    Route.put("services/blocked/:id", "ServiceController.blocked");
    Route.put("services/tickets/:id", "ServiceController.tickets");
    Route.put("services/update/:id", "ServiceController.update");
    Route.put("services/reactived/:id", "ServiceController.reactived");

    //Recharges internet
    Route.get("recharges", "RechargeController.index").as("recharges");
    Route.post("recharges/create", "RechargeController.create").as("recharges.create");
    Route.get("recharges/delete/:id", "RechargeController.delete");
    Route.put("recharges/update/:id", "RechargeController.update");
    //Dotations bobines
    Route.get("dotations", "DotationController.index").as("dotations");
    Route.post("dotations/create", "DotationController.create").as("dotations.create");
    Route.get("dotations/delete/:id", "DotationController.delete");
    Route.put("dotations/update/:id", "DotationController.update");
    //Fournisseurs bobines
    Route.get("suppliers", "SupplierController.index").as("suppliers");
    Route.post("suppliers/create", "SupplierController.create").as("suppliers.create");
    Route.get("suppliers/delete/:id", "SupplierController.delete");
    Route.put("suppliers/update/:id", "SupplierController.update");
    //Commandes bobines
    Route.get("commandes", "CommandeController.index").as("commandes");
    Route.post("commandes/create", "CommandeController.create").as("commandes.create");
    Route.get("commandes/view/:id", "CommandeController.view");
    Route.get("commandes/delete/:id", "CommandeController.delete");
    Route.put("commandes/update/:id", "CommandeController.update");
    Route.put("commandes/items/:id", "CommandeController.items");
    Route.put("commandes/paiement/:id", "CommandeController.paiement");
    //Stock bobines
    Route.get("inventory", "InventoryController.index").as("inventory");
    Route.get("inventory/delete/:id", "InventoryController.delete");
    Route.put("inventory/update/:id", "InventoryController.update");
}).middleware(["auth"]);