import Icon from '@beans/icon';
import { isFunction } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { withTheme } from 'styled-components';
import * as consts from './constants';
import { Content, ContentContainer, Heading, LinkContainer, RootContainer, StyledButton, StyledLink, IndicatorContainer } from './styled';

/**
 * An accordion component to show/hide content.
 *
 * ```javascript
 * import { Accordion } from '@beans/accordion';
 *
 * <Accordion id="accordion-1" label="Accordion label">
 *   Accordion content...
 * </AccordionContainer>
 * ```
 */
class Accordion extends React.Component {
  static defaultProps = {
    className: undefined,
    contentPadding: true,
    domRef: undefined,
    emphasized: true,
    flush: false,
    fullWidth: false,
    icon: consts.EXPAND,
    onChange: undefined,
    onKeyDown: undefined,
    open: false,
    theme: undefined,
    variant: consts.PRIMARY,
    indicatorText: undefined,
    showIndicator: false,
    indicatorVariant: consts.ERROR
  };

  static propTypes = {
    /**
     * The content of the accordion.
     */
    children: PropTypes.node.isRequired,

    /**
     * Any classes to apply to the component root element.
     */
    className: PropTypes.string,

    /**
     * Stops padding from being applied to the content area.
     */
    contentPadding: PropTypes.bool,

    /**
     * Ref to ensure consuming apps can access heading DOM element.
     */
    domRef: PropTypes.func,

    /**
     * If true, the heading link will be bold.
     */
    emphasized: PropTypes.bool,

    /**
     * If true, the accordion does not have any padding
     * to the left or right.
     */
    flush: PropTypes.bool,

    /**
     * Set to true if you plan to run the accordion across the
     * entire width of the viewport.
     */
    fullWidth: PropTypes.bool,

    /**
     * The name of the icon to display in the heading.
     */
    icon: PropTypes.string,

    /**
     * Identifier to link the accordion header and content.
     */
    id: PropTypes.string.isRequired,

    /**
     * The label to display in the accordion heading.
     */
    label: PropTypes.string.isRequired,

    /**
     * Handler to execute when the accordion is opened or closed.
     */
    onChange: PropTypes.func,

    /**
     * Handler to execute on keydown when focused on
     * the accordion heading.
     */
    onKeyDown: PropTypes.func,

    /**
     * Whether the accordion is open.
     */
    open: PropTypes.bool,

    /**
     * To use the component without a `ThemeProvider`, pass in an object
     * with the correct key/value structure.
     */
    theme: PropTypes.objectOf(PropTypes.any),

    /**
     * The style variant of the accordion. This property determines
     * the color theme to apply to the accordion.
     */
    variant: PropTypes.oneOf([consts.PRIMARY, consts.SECONDARY]),
  };

  _contentRef = {};

  _handleContainerOnAnimationEnd = () => {
    this.setState({ animation: this.props.open ? consts.OPEN : consts.CLOSED });
  };

  _handleHeadingOnClick = () => {
    const { id, onChange, open } = this.props;

    if (isFunction(onChange)) {
      const action = open ? consts.CLOSE : consts.OPEN;
      onChange({ action, id });
    }
  };

  _handleHeadingOnKeyDown = (event) => {
    const keyCode = event.which;

    if (keyCode === consts.SPACE || keyCode === consts.ENTER) {
      event.preventDefault();
      this._toggleAccordion();
    }

    const { onKeyDown } = this.props;
    if (isFunction(onKeyDown)) onKeyDown(event);
  };

  _headingRef = {};

  constructor(props) {
    super(props);
    this.state = { animation: props.open ? consts.OPEN : consts.CLOSED };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.animation === this.state.animation) return;

    if (this.state.animation === consts.OPEN) {
      this._accordionOpen();
    } else if (this.state.animation === consts.CLOSED) {
      this._accordionClosed();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open === this.props.open) return;

    let { animation } = this.state;

    if (nextProps.open && animation === consts.CLOSED) {
      animation = consts.OPENING;
    } else {
      animation = consts.CLOSING;
    }

    this.setState({ animation });
  }

  render() {
    const {
      className,
      domRef,
      emphasized,
      icon,
      id,
      flush,
      fullWidth,
      label,
      onKeyDown,
      open,
      theme,
      variant,
      indicatorText,
      indicatorVariant,
      showIndicator,
      ...otherProps
    } = this.props;

    return (
      <RootContainer className={className} theme={theme} {...otherProps}>
        <Heading
          aria-controls={id}
          aria-expanded={open}
          aria-label={label}
          className={`${consts.COMPONENT_NAME}__heading`}
          flush={flush}
          onClick={this._handleHeadingOnClick}
          onKeyDown={this._handleHeadingOnKeyDown}
          ref={(element) => {
            this._headingRef.current = element;
            if (isFunction(domRef)) domRef(element);
          }}
          role="button"
          tabIndex="0"
          theme={theme}
        >
          <LinkContainer flush={flush} fullWidth={fullWidth}>
            <StyledLink
              className={`${consts.COMPONENT_NAME}__link`}
              emphasized={emphasized}
              role="presentation"
              tabIndex="-1"
              theme={theme}
            >
              {label}
            </StyledLink>
            {showIndicator && <IndicatorContainer variant={indicatorVariant}>
              {indicatorText}
            </IndicatorContainer>}
          </LinkContainer>

          <StyledButton
            className={`${consts.COMPONENT_NAME}__button`}
            flush={flush}
            fullWidth={fullWidth}
            icon={icon}
            open={open}
            role="presentation"
            size="xs"
            tabIndex="-1"
            theme={theme}
            variant={variant}
          >

            <Icon graphic={icon} />
          </StyledButton>
        </Heading>
        {this._renderAccordionContent()}
      </RootContainer>
    );
  }

  _accordionClosed() {
    this._headingRef.current.focus();
  }

  _accordionOpen() {
    this._contentRef.current.focus();
  }

  _getContentHeight() {
    if (!this._contentRef.current) return undefined;
    return this._contentRef.current.offsetHeight;
  }

  _renderAccordionContent() {
    const { children, contentPadding, flush, id, open } = this.props;

    return (
      <ContentContainer
        animation={this.state.animation}
        className={`${consts.COMPONENT_NAME}__content-container`}
        contentHeight={this._getContentHeight()}
        onAnimationEnd={this._handleContainerOnAnimationEnd}
        open={open}
      >
        <Content
          className={`${consts.COMPONENT_NAME}__content`}
          contentPadding={contentPadding}
          flush={flush}
          id={id}
          ref={(element) => {
            this._contentRef.current = element;
          }}
          role="region"
          tabIndex="-1"
        >
          {children}
        </Content>
      </ContentContainer>
    );
  }

  _toggleAccordion() {
    const { id, onChange, open } = this.props;

    if (isFunction(onChange)) {
      onChange({ action: open ? consts.CLOSE : consts.OPEN, id });
    }
  }
}

export default withTheme(Accordion);
