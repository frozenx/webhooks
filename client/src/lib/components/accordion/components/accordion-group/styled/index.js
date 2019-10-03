import { RootElement } from '@beans/foundation';
import { colors } from '@beans/selectors';
import styled from 'styled-components';

const RootContainer = styled(RootElement)`
  > * {
    border-bottom-color: transparent;

    &:last-child {
      border-bottom-color: ${colors.lines};
    }
  }
`;

export default RootContainer;
