import React, { Component } from "react";
import Header from "./components/atoms/Header";
import LanguagePackConnecter from './components/context/connectors/languagePackConnector';

import Footer from './components/molecules/footer';
import { DefaultThemeProvider } from "@beans/theme";
import { contentLinks, copyrightText } from "./languagepack";
import {
  bold,
  boldItalic,
  regular,
  italic as regularItalic
} from "@beans/tesco-modern";

const globalStyles = {
  tescoModern: {
    inlineFontData: {
      bold,
      boldItalic,
      regular,
      regularItalic
    },
    styleNames: ["bold", "boldItalic", "regular", "regularItalic"]
  },
  normalize: true
};

class Layout extends Component {
  render() {
    const {
      props: {
        secondaryNavigationList,
        children
      }
    } = this

    return (
      <DefaultThemeProvider globalStyles={globalStyles}>
        <LanguagePackConnecter>
          <Header secondaryNavigationList={secondaryNavigationList ? secondaryNavigationList : null} />
          {children}
          <Footer
            contentLinks={contentLinks}
            copyrightText={copyrightText}
            root={true}
          />
        </LanguagePackConnecter>
      </DefaultThemeProvider>
    );
  }
}

export default Layout;
