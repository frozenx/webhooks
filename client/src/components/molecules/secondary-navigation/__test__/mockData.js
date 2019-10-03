import React from 'react';
import { Link } from 'react-router-dom';

const expectedMenuItems = [
    {
      id: "managesupplier",
      hasPopup: false,
      altLink: () => (
        <Link to="/tradingpartner/manage">Manage suppliers</Link>
      ),
      text: "Manage suppliers"
    },
    {
      id: "createsupplier",
      hasPopup: false,
      altLink: () => <Link to="/tradingpartner">Create new supplier</Link>,
      text: "Create new supplier"
    }
  ]

  export default {
      expectedMenuItems
  }