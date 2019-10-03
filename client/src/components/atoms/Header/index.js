import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '@ep/header';


export class HeaderComponent extends Component {
    AltLink = ({ children, href }) => {
        return <Link to={href}>{children}</Link>;
    }


    render() {
        return (
            <React.Fragment>
                <Header
                    primaryNavigationList={[{
                        id: "createsupplier",
                        altLink: () => (
                            <Link to="/tradingpartner/manage" id="createsupplier">
                                Create new partner
                          </Link>
                        ),
                        href: "/tradingpartner/manage",
                        text: "Create new partner"
                    },
                    {
                        id: "managesupplier",
                        href: "/tradingpartner",
                        altLink: () => (
                            <Link to="/tradingpartner" id="managesupplier">
                                Manage partners
                          </Link>
                        ),
                        text: "Manage partners"
                    }]}
                    logoSubtitle={"Trading Partner Service"}
                    altLink={this.AltLink}
                    secondaryNavigationList={[]}
                    showNavigationMenus={true}
                />


            </React.Fragment >
        )
    }
}
export default HeaderComponent;





