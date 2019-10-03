import React, { Component, Fragment } from "react";
import MainMenu, { StaticSubmenu } from "@beans/primary-navigation";
import { secondaryNavigation } from "../../../languagepack";
import uamResolver from "../../../lib/uam-resolver";
import Loader from "../../atoms/DotLoader";
import { Link } from 'react-router-dom';

class SecondaryNavigation extends Component {
  state = {
    resolvedNavigations: {
      menuItems: [
        {
          id: "createsupplier",
          hasPopup: false,
          altLink: () => (
            <Link to="/tradingpartner" id="createsupplier">
              Create new supplier
            </Link>
          ),
          text:"Create new supplier"
        },
        {
          id: "managesupplier",
          hasPopup: false,
          altLink: () => (
            <Link to="/tradingpartner/manage" id="managesupplier">
              Manage suppliers
            </Link>
          ),
          text: "Manage suppliers"
        }
      ],
      mobileMenuItem: secondaryNavigation.mobileMenuItem,
      moreMenuItem: secondaryNavigation.moreMenuItem
    },
    loaderStatus: false
  };

  componentWillMount() {
    const { secondaryNavigationList } = this.props;
    if (secondaryNavigationList) {
      this.setState({
        loaderStatus: true
      });
      let resolvedNavigations = uamResolver.resolveSecondaryNavigation(
        secondaryNavigationList
      );
      this.setState({
        resolvedNavigations: {
          ...this.state.resolvedNavigations,
          menuItems: resolvedNavigations
        },
        loaderStatus: false
      });
    } else {
    }
  }

  render() {
    const { resolvedNavigations, loaderStatus } = this.state;
    if (loaderStatus) {
      return <Loader />;
    } else {
      return (
        <Fragment>
          <MainMenuContainer>
            <MainMenu
              menuItems={resolvedNavigations.menuItems}
              mobileMenuItem={resolvedNavigations.mobileMenuItem}
              moreMenuItem={resolvedNavigations.moreMenuItem}
              selectedMenuItemID="createsupplier"
            >
              <StaticSubmenu />
            </MainMenu>
          </MainMenuContainer>
          {/* <style jsx = "true" global = "true">
        {
          `
          #createsupplier{
            color: #007eb3;
            border-bottom-color: #007eb3;
          }
          
          `
        }
      </style> */}
        </Fragment>
      );
    }
  }
}

class MainMenuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedMenuItemID: props.selectedMenuItemID };
    this._onChange = this._onChange.bind(this);
  }

  componentWillReceiveProps({ selectedMenuItemID }) {
    this.setState({ selectedMenuItemID });
  }

  render() {
    const { children } = this.props;
    const { selectedMenuItemID } = this.state;

    return React.cloneElement(children, {
      onChange: this._onChange,
      selectedMenuItemID
    });
  }

  _onChange({ selectedMenuItemID }) {
    this.setState({ selectedMenuItemID });
  }
}

export default SecondaryNavigation;
