import React from 'react';
import Footer from '@beans/colleague-footer';
import { Link as ReactRouterLink } from 'react-router-dom';




class FooterContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { accordion: props.accordion };
    this._onChange = this._onChange.bind(this);
  }

  render() {
    const { children } = this.props;
    const { accordion } = this.state;

    return React.cloneElement(children, {
      accordion,
      onChange: this._onChange,
    });
  }

  _onChange({ action, id }) {
    this.setState({ accordion: { action, id } });
  }
}

function AltLink({ children, href }) {
  return <ReactRouterLink to={href}>{children}</ReactRouterLink>;
}


export default ({ contentLinks, copyrightText }) => {
  return (
    <FooterContainer>
      <Footer
        altLink={AltLink}
        columnSize={{ md: 8 }}
        contentLinks={contentLinks} copyrightText={copyrightText} root />
    </FooterContainer>
  )
}

