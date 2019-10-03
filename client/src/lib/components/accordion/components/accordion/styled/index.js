import Button from '@beans/button';
import { BaseElement, media, RootElement } from '@beans/foundation';
import Link from '@beans/link';
import { base, colors, formFields, lineHeight, spacing } from '@beans/selectors';
import StatusIndicator from '@beans/colleague-status-indicator';
import styled, { css } from 'styled-components';
import * as consts from '../constants';
import getAnimationStyles from '../helpers';

export const RootContainer = styled(RootElement)`
  border-bottom: 1px solid ${colors.lines};
  border-top: 1px solid ${colors.lines};
`;

export const Heading = styled(BaseElement)`

  cursor: pointer;
  padding: ${spacing.xs} ${props => (props.flush ? '0' : spacing.sm(props))};

  &:focus,
  &:hover {
    .${consts.COMPONENT_NAME}__link {
      border-bottom-color: ${colors.active};
      color: ${colors.active};
    }
  }
`;

const fullWidthButtonStyles = css`
  left: ${props => (props.flush ? '0' : spacing.sm(props))};
  right: auto;
`;

export const StyledButton = styled(Button)`
  position: absolute;
  right: ${props => (props.flush ? '0' : spacing.sm(props))};
  top: ${spacing.xs};
  transition: box-shadow ${base.transitionDuration}, transform ${base.transitionDuration};
  transform: ${({ icon, open }) => (open && icon === consts.EXPAND ? 'rotate(180deg)' : 'rotate(0)')};

  ${media.aboveDesktop`
    ${({ fullWidth }) => fullWidth && fullWidthButtonStyles};
  `};
`;

const fullWidthLinkContainerStyles = css`
  margin-left: ${props => spacing.xlInt(props) + spacing.xsInt(props)}px;
  margin-right: 0;
`;

export const LinkContainer = styled(BaseElement)`
 
  
  margin-right: ${props => spacing.xlInt(props) + spacing.smInt(props)}px;

  ${media.aboveDesktop`
    ${({ fullWidth }) => fullWidth && fullWidthLinkContainerStyles};
  `};
`;

export const StyledLink = styled(Link)`
  border-bottom-color: transparent;
  line-height: ${lineHeight.xsText};
`;

export const ContentContainer = styled(BaseElement)`
  overflow: hidden;
  ${getAnimationStyles};
`;

export const contentPaddingStyles = css`
  padding: ${spacing.sm} ${props => (props.flush ? '0' : spacing.sm(props))};
`;

export const Content = styled(BaseElement)`
  ${({ contentPadding }) => contentPadding && contentPaddingStyles};
`;

export const IndicatorContainer = styled(StatusIndicator)`
  float: right;
  top: 2px;
`;
