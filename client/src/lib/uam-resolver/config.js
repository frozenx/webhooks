import React from "react";
import CreateSupplier from "../../components/pages/CreateSupplier/CreateSupplier";
import ManageSupplier from "../../components/pages/CreateSupplier/ManageSupplier";
import Supplier from "../../components/pages/SupplierHeader";
import { Link } from 'react-router-dom';

const routesConfig = {
  tradingpartner: {
    exact: true,
    pathname: "/tradingpartner",
    component: ManageSupplier
  },
  "tradingpartner/manage": {
    exact: true,
    pathname: "/tradingpartner/manage",
    component: CreateSupplier
  },  
  "tradingpartner/supplier": {
    exact: true,
    pathname: "/tradingpartner/supplier",
    component: Supplier
  }
};

const navigationAccessList = ["tradingpartner", "tradingpartner/manage"];

const navigationConfig = {
  tradingpartner: {
    id: "createsupplier",
    hasPopup: false,
    altLink: () => (
      <Link to="/tradingpartner/manage" id="createsupplier">
        Create new partner
      </Link>
    ),
    text: "Create new supplier"
  },
  "tradingpartner/manage": {
    id: "managesupplier",
    hasPopup: false,
    altLink: () => (
      <Link to="/tradingpartner/" id="managesupplier">
        Manage partner
      </Link>
    ),
    text: "Manage suppliers"
  }
};

export default {
  routesConfig,
  navigationAccessList,
  navigationConfig
};
