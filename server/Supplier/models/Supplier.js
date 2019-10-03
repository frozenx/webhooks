class SupplierModel {
  constructor(payload) {
    this.entityType = payload.entityType;
    this.uuid = payload.uuid;
    this.number = payload.number;
    this.name = payload.name;
    this.partnerTaxRegion = payload.partnerTaxRegion;
    this.taxOrganisationType = payload.taxOrganisationType;
    this.status = payload.status;
    this.siteInvoiceCurrency = payload.siteInvoiceCurrency;
    this.productCategory = payload.productCategory;
    this.subGroup = payload.subGroup;
  }
}

module.exports = SupplierModel;
