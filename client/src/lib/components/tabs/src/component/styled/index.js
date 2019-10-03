import { BaseElement, BaseList, RootElement, scrollableHorizontal } from '@beans/foundation';
import { base, spacing } from '@beans/selectors';
import StatusIndicator from '@beans/colleague-status-indicator';
import styled, { css } from 'styled-components';
import {
  getTabBackgroundColor,
  getTabBorderColor,
  getTabLinkColor,
  getTabLinkFontWeight,
  getInactiveTabLinkPseudoFontWeight,
  getTabLinkPadding,
  getTabLinkPointerEvents,
  getTabListBorderColor,
} from '../helpers';

export const TabsContainer = RootElement;

export const ScrollableContainer = styled(BaseElement)`
  ${scrollableHorizontal};
`;

export const TabListContainer = styled(BaseElement)`
  border-bottom: 1px solid ${getTabListBorderColor};
  display: inline-block;
  min-width: 100%;
`;

export const TabList = styled(BaseList)`
  display: table-cell;
  height: 54px;
  vertical-align: bottom;

  > li:first-child {
    margin-left: ${spacing.md};
  }

  > li:last-child {
    margin-right: ${spacing.md};
  }
`;

const activeTabStyles = css`
  border-color: ${getTabListBorderColor};
  height: 54px;
  margin-bottom: -1px;
`;

export const Tab = styled(BaseElement)`
  background-color: ${getTabBackgroundColor};
  border: 1px solid ${getTabBorderColor};
  border-bottom: none;
  display: inline-block;
  height: 50px;
  margin-left: ${spacing.xs};
  vertical-align: bottom;
  min-width: 133px;
  ${({ active }) => active && activeTabStyles};
`;

const inactiveTabLinkLabelHoverStyles = css`
  border-bottom-color: ${getTabLinkColor({ isActive: true })};
  color: ${getTabLinkColor({ isActive: true })};
  transition: border ${base.transitionDuration}, color ${base.transitionDuration};
`;

const inactiveTabLinkLabelStyles = css`
  margin: 0 8px;

  &&::after {
    display: block;
    content: attr(aria-label);
    font-weight: ${getInactiveTabLinkPseudoFontWeight};
    height: 0;
    visibility: hidden;
  }
`;

export const TabLink = styled(BaseElement)`
  color: ${getTabLinkColor()};
  cursor: pointer;
  display: block;
  font-weight: ${getTabLinkFontWeight};
  height: 100%;
  padding: ${getTabLinkPadding};
  pointer-events: ${getTabLinkPointerEvents};
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  ${({ active }) => !active && inactiveTabLinkLabelStyles};

  &:hover {
    > span {
      ${({ active }) => !active && inactiveTabLinkLabelHoverStyles};
    }
  }
`;

const activeTabLinkLabelStyles = css`
  padding: 0 ${spacing.xs};

  &::after {
    background-color: ${getTabLinkColor({ isActive: true })};
    bottom: -14px;
    content: ' ';
    height: ${spacing.xx};
    left: 0;
    position: absolute;
    width: 100%;
  }
`;

export const TabLinkLabel = styled(BaseElement)`
  border-bottom: 1px solid transparent;
  display: inline-block;
  ${({ active }) => active && activeTabLinkLabelStyles};

  &:hover {
    ${({ active }) => !active && inactiveTabLinkLabelHoverStyles};
  }
`;

export const TabPanel = styled(BaseElement)`
  margin-top: -3px;
`;


export const StyledStatusIndicator = styled(StatusIndicator)`
  left: 10px;
  top: 3px;
`;