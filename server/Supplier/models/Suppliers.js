const Supplier = require('./Supplier');

class SuppliersModel {
  constructor(payload) {
    this.suppliers = payload.content ? payload.content.map(supplier => new Supplier(supplier)) : [];
    this.totalCount = payload.totalCount || null;
    this.totalPages = payload.totalPages || null;
    this.offset = payload.offset || null;
    this.limit = payload.limit || null;
  }
}

module.exports = SuppliersModel;
