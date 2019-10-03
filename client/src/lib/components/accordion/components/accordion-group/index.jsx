import { isFunction } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import * as consts from './constants';
import RootContainer from './styled';

/**
 * An accordion group component to manage
 * accordion components.
 *
 * ```javascript
 * import { Accordion, AccordionGroup } from '@beans/accordion';
 *
 * <AccordionGroup>
 *   <Accordion id="accordion-1" label="Accordion label">
 *     Accordion content...
 *   </AccordionContainer>
 *   <Accordion id="accordion-2" label="Accordion label">
 *     Accordion content...
 *   </AccordionContainer>
 *   <Accordion id="accordion-3" label="Accordion label">
 *     Accordion content...
 *   </AccordionContainer>
 * </AccordionGroup>
 * ```
 */
export default class AccordionGroup extends React.Component {
  static defaultProps = {
    accordion: {
      action: consts.CLOSE,
      id: consts.ALL,
    },
    className: undefined,
    flush: false,
    fullWidth: false,
    independent: false,
    onChange: undefined,
    theme: undefined,
    variant: consts.PRIMARY,
  };

  static propTypes = {
    /**
     * The accordion ID and the action to apply to it.
     * If you pass 'all' as the ID, then the action will
     * apply to all accordions.
     */
    accordion: PropTypes.shape({
      action: PropTypes.oneOf([consts.OPEN, consts.CLOSE]),
      id: PropTypes.string,
    }),

    /**
     * The accordion components in the group.
     */
    children: PropTypes.node.isRequired,

    /**
     * Any classes to apply to the component root element.
     */
    className: PropTypes.string,

    /**
     * If true, the accordions will not have any padding
     * to the left or right.
     */
    flush: PropTypes.bool,

    /**
     * Set to true if you plan to run the accordions across the
     * entire width of the viewport.
     */
    fullWidth: PropTypes.bool,

    /**
     * Whether the accordions act together or independently. If
     * indenpendent, then multiple accordions can be open at
     * the same time.
     */
    independent: PropTypes.bool,

    /**
     * Handler to execute when an accordion is opened or closed.
     */
    onChange: PropTypes.func,

    /**
     * To use the component without a `ThemeProvider`, pass in an object
     * with the correct key/value structure.
     */
    theme: PropTypes.objectOf(PropTypes.any),

    /**
     * The style variant of the accordions. This property determines
     * the color theme to apply to the accordion.
     */
    variant: PropTypes.oneOf([consts.PRIMARY, consts.SECONDARY]),
  };

  _accordionRefs = {};
  _activeAccordionID = '';

  _handleAccordionHeadingOnKeyDown = (event) => {
    this._setActiveAccordionID(event.currentTarget);
    const keyCode = event.which;

    if (keyCode === consts.UP_ARROW || keyCode === consts.DOWN_ARROW) {
      this._focusNextAccordion(keyCode);
    } else if (keyCode === consts.HOME) {
      this._focusFirstAccordion();
    } else if (keyCode === consts.END) {
      this._focusLastAccordion();
    }
  };

  _handleAccordionOnChange = ({ action, id }) => {
    const { onChange } = this.props;
    if (isFunction(onChange)) onChange({ action, id, accordions: this.state.accordions });
  };

  constructor(props) {
    super(props);
    this.state = { accordions: this._getDefaultAccordionStates(props) };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ accordions: this._getAccordionStates(nextProps) });
  }

  render() {
    const { accordion, children, className, independent, onChange, theme, ...otherProps } = this.props;

    return (
      <RootContainer className={className} theme={theme}>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            domRef: (element) => {
              this._accordionRefs[child.props.id] = { current: element };
            },
            onChange: this._handleAccordionOnChange,
            onKeyDown: this._handleAccordionHeadingOnKeyDown,
            open: this._isAccordionOpen(child.props.id),
            ...otherProps,
          }))}
      </RootContainer>
    );
  }

  _focusFirstAccordion() {
    const ids = Object.keys(this.state.accordions);
    const nextID = ids[0];
    const nextRef = this._accordionRefs[nextID];
    nextRef.current.focus();
  }

  _focusLastAccordion() {
    const ids = Object.keys(this.state.accordions);
    const nextID = ids[ids.length - 1];
    const nextRef = this._accordionRefs[nextID];
    nextRef.current.focus();
  }

  _focusNextAccordion(keyCode) {
    const nextID = this._getNextAccordionID(keyCode);
    const nextRef = this._accordionRefs[nextID];
    nextRef.current.focus();
  }

  _getAccordionState(id) {
    return this.state.accordions[id];
  }

  _getAccordionStates({ accordion, children, independent }) {
    const { accordions } = this.state;

    return React.Children.toArray(children).reduce((obj, { props }) => {
      let isOpen;

      if (accordion.id === props.id || accordion.id === consts.ALL) {
        isOpen = accordion.action === consts.OPEN;
      } else if (independent) {
        isOpen = accordions[props.id].open;
      } else {
        isOpen = false;
      }

      obj[props.id] = { open: isOpen };
      return obj;
    }, {});
  }

  _getDefaultAccordionStates({ accordion, children }) {
    return React.Children.toArray(children).reduce((obj, { props }) => {
      let isOpen;

      if (accordion.id === props.id || accordion.id === consts.ALL) {
        isOpen = accordion.action === consts.OPEN;
      } else {
        isOpen = false;
      }

      obj[props.id] = { open: isOpen };
      return obj;
    }, {});
  }

  _getNextAccordionID(keyCode) {
    const ids = Object.keys(this.state.accordions);
    const index = ids.findIndex(id => id === this._activeAccordionID);
    let nextIndex = keyCode === consts.UP_ARROW ? index - 1 : index + 1;

    if (nextIndex < 0) {
      nextIndex = 0;
    } else if (nextIndex === ids.length) {
      nextIndex = ids.length - 1;
    }

    return ids[nextIndex];
  }

  _isAccordionOpen(id) {
    return this._getAccordionState(id).open;
  }

  _setActiveAccordionID(element) {
    this._activeAccordionID = element.getAttribute('aria-controls');
  }
}
