import { slideDown, slideUp } from '@beans/foundation';
import { css } from 'styled-components';
import * as consts from '../constants';

const animationStyles = {
  closed: css`
    height: 0;
    visibility: hidden;
  `,
  closing: slideUp,
  open: css`
    height: auto;
  `,
  opening: slideDown,
};

function getAnimationStyles({ animation, contentHeight }) {
  const animationStyle = animationStyles[animation];
  let output;

  if (animation === consts.OPEN || animation === consts.CLOSED) {
    output = animationStyle;
  } else {
    output = animationStyle(contentHeight);
  }

  return output;
}

export default getAnimationStyles;
