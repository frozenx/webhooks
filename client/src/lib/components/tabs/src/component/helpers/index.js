import { spacing } from '@beans/selectors';

export function getTabBackgroundColor({ active, theme }) {
  const { colors } = theme;
  return active ? colors.background.base : colors.background.dark;
}

export function getTabBorderColor({ theme }) {
  return theme.colors.background.dark;
}

export function getTabListBorderColor({ theme }) {
  return theme.colors.lines.base;
}

export function getTabLinkColor({ isActive } = {}) {
  return ({ active, disabled, theme }) => {
    const { colors } = theme;
    let output;

    if (disabled) {
      output = colors.disabled.base;
    } else if (active || isActive) {
      output = colors.active;
    } else {
      output = colors.primary;
    }

    return output;
  };
}

export function getTabLinkFontWeight({ active }) {
  return active ? '600' : '400';
}

export function getInactiveTabLinkPseudoFontWeight() {
  return getTabLinkFontWeight({ active: true });
}

export function getTabLinkPaddingTop(props) {
  let top = spacing.mdInt(props);
  if (props.active) top += 3;
  return `${top}px`;
}

export function getTabLinkPadding(props) {
  return `${getTabLinkPaddingTop(props)} ${spacing.md(props)} 0 ${spacing.md(props)}`;
}

export function getTabLinkPointerEvents({ disabled }) {
  return disabled ? 'none' : 'auto';
}
