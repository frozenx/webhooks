import styled from 'styled-components';
import { RootElement, BaseElement, media } from '@beans/foundation';
import Button from '@beans/button';

export const NotFoundContainer = styled(RootElement)`
  color: rgb(0, 83, 159);
  font-size: 24px;
  
  p {
    text-align: center;
  }
`;


export const ErrorContainer = styled(BaseElement)`
  display: flex;
  flex-direction: column;
  align-items: center;
  && {
    button {
      margin-top: 12px;
    }
  }

  ${media.belowDesktop`padding: 10px;`}

  
  
`;

