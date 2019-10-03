import { isFunction } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {
  ScrollableContainer,
  Tab,
  TabLink,
  TabLinkLabel,
  TabList,
  TabListContainer,
  TabPanel,
  TabsContainer,
  StyledStatusIndicator
} from './styled';

const HOME = 36;
const END = 35;
const DOWN_ARROW = 40;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

const keys = [HOME, END, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW];

/**
 * A component that includes tabs and their corresponding tab panels.
 *
 * ```javascript
 * import Tabs from '@beans/tabs';
 *
 * <Tabs
 *   activeTabID="tab1"
 *   tabs={[{
 *     id: 'tab1',
 *     label: 'Section 1',
 *     panelContent: 'Section content...',
 *     panelID: 'section1',
 *   }]}
 * />
 * ```
 */
export default class Tabs extends React.Component {
  static defaultProps = {
    activeTabID: undefined,
    className: undefined,
    onChange: undefined,
    theme: undefined,
  };

  static propTypes = {
    /**
     * Which tab should be active.
     */
    activeTabID: PropTypes.string,

    /**
     * Any classes to apply to the component root element.
     */
    className: PropTypes.string,

    /**
     * Event handler to execute on change of tab.
     */
    onChange: PropTypes.func,

    /**
     * The data to display in each tab and its corresponding panel.
     */
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Whether the tab is disabled.
         */
        disabled: PropTypes.bool,

        /**
         * Href to add to the tab link for non-javascript support.
         */
        href: PropTypes.string,

        /**
         * The id to link each tab with its panel.
         */
        id: PropTypes.string.isRequired,

        /**
         * The text to display in the tab.
         */
        label: PropTypes.string.isRequired,

        /**
         * The content to display in the panel.
         */
        panelContent: PropTypes.node.isRequired,

        /**
         * The id to link each panel with its tab.
         */
        panelID: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,

    /**
     * To use the component without a `ThemeProvider`, pass in an object
     * with the correct key/value structure.
     */
    theme: PropTypes.objectOf(PropTypes.any), // eslint-disable-line react/no-unused-prop-types
  };

  _panelRefs = {};
  _tabRefs = {};

  constructor(props) {
    super(props);
    this._handleOnClick = this._handleOnClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeTabID === this.props.activeTabID) return;
    this._tabChanged();
  }

  render() {
    return (
      <TabsContainer className={this.props.className}>
        <ScrollableContainer tabIndex="-1">
          <TabListContainer>
            <TabList role="tablist">{this._renderTabs()}</TabList>
          </TabListContainer>
        </ScrollableContainer>
        {this._renderPanels()}
      </TabsContainer>
    );
  }

  _changeTab(nextTab) {
    const { onChange } = this.props;
    const prevTab = this._getTab();
    if (isFunction(onChange)) onChange({ nextTab, prevTab });
  }

  _focusOnPanel() {
    const activeTab = this._getTab();
    const activePanelRef = this._panelRefs[activeTab.panelID];
    activePanelRef.current.focus();
  }

  _getNextTab(prevTabID, keyCode) {
    const { tabs } = this.props;
    const index = tabs.findIndex(({ id }) => prevTabID === id);
    let nextIndex;

    if (keyCode === HOME) {
      nextIndex = 0;
    } else if (keyCode === END) {
      nextIndex = tabs.length - 1;
    } else if (keyCode === LEFT_ARROW) {
      nextIndex = index - 1;
    } else {
      nextIndex = index + 1;
    }

    const nextTab = tabs[nextIndex];
    if (!nextTab) return undefined;
    if (!nextTab.disabled) return nextTab;
    let newKeyCode;

    if (keyCode === HOME) {
      newKeyCode = RIGHT_ARROW;
    } else if (keyCode === END) {
      newKeyCode = LEFT_ARROW;
    } else {
      newKeyCode = keyCode;
    }

    return this._getNextTab(nextTab.id, newKeyCode);
  }

  _getTab(tabID = this.props.activeTabID) {
    const { tabs } = this.props;
    return tabs.find(({ id }) => tabID === id);
  }

  _handleKeyDown(event) {
    const keyCode = event.which;
    if (!keys.includes(keyCode)) return;

    if (keyCode === DOWN_ARROW) {
      this._focusOnPanel();
    } else {
      const nextTab = this._getNextTab(this.props.activeTabID, keyCode);
      if (nextTab) this._changeTab(nextTab);
    }
  }

  _handleOnClick(event) {
    event.preventDefault();
    const nextTab = this._getTab(event.currentTarget.id);
    this._changeTab(nextTab);
  }

  _renderPanels() {
    const { activeTabID, tabs } = this.props;

    return tabs.map(({ id, panelContent, panelID }) => {
      const isActive = activeTabID === id;

      return (
        <TabPanel
          aria-labelledby={id}
          as="section"
          hidden={!isActive}
          id={panelID}
          key={panelID}
          ref={(element) => {
            this._panelRefs[panelID] = { current: element };
          }}
          role="tabpanel"
          tabIndex="-1"
        >
          {panelContent}
        </TabPanel>
      );
    });
  }

  _renderTabs() {
    const { activeTabID, tabs } = this.props;

    return tabs.map(({ disabled, href, id, label, panelID, showIndicator, indicatorText, indicatorVariant }) => {
      const isActive = activeTabID === id;

      return (
        <Tab active={isActive} as="li" key={id} role="presentation">
          <TabLink
            active={isActive}
            aria-controls={panelID}
            aria-label={label}
            aria-selected={isActive}
            as="a"
            disabled={disabled}
            href={href}
            id={id}
            onClick={this._handleOnClick}
            onKeyDown={this._handleKeyDown}
            ref={(element) => {
              this._tabRefs[id] = { current: element };
            }}
            role="tab"
            tabIndex={isActive ? '0' : '-1'}
          >
            <TabLinkLabel active={isActive} as="span" disabled={disabled}>
              {label}
              {showIndicator && <StyledStatusIndicator variant={indicatorVariant}>
                {indicatorText}
              </StyledStatusIndicator>
              }
            </TabLinkLabel>
          </TabLink>
        </Tab>
      );
    });
  }

  _tabChanged() {
    const nextTabRef = this._tabRefs[this.props.activeTabID];
    nextTabRef.current.focus();
  }
}
