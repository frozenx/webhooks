import styled from 'styled-components';
import { RootElement, media } from '@beans/foundation';
import Label from '@beans/label';

export const LineContainer = styled(RootElement)`
  border-bottom: 1px solid #cccccc;
  margin-bottom: 24px;
`

export const CardContainer = styled(RootElement)`
  background: #f6f6f6;
  border: 1px solid #e5e5e5;
  margin-bottom: 24px;
`;

export const DataContainer = styled(RootElement)`
  padding: 26px 105px 0px 105px;
  ${media.tabletOnly`
      padding-left: 63px;
      padding-right: 63px;
  `}
  ${media.mobileLargeOnly`
      padding-left: 40px;
      padding-right: 40px;
  `}
  ${media.mobileOnly`
      padding-left: 12px;
      padding-right: 12px;
  `}
`;


export const HeaderContainer = styled(RootElement)`
  label{
    margin-bottom: 22px;
    width: 78%;
    word-break: break-all;
  }
  h1 {
    font-size: 24px;
    margin: 0;
  }
  button{
    float: right;
  }
  ${media.mobileLargeOnly`
    label{
      width: 100%;
    }
    button{
      float: none;
      margin-bottom: 20px
    }
  `}
  ${media.mobileOnly`
    label{
      width: 100%;
    }
    button{
      float: none;
      margin-bottom: 20px
    }
  `}
`;

export const BodyContainer = styled(RootElement)``;

export const BasicDetailContainer = styled(RootElement)`
  width: 45%;
  display: inline-block;
  margin-right: 24px;
  margin-bottom: 20px;
  label{
    vertical-align: top;
    width: 100%;
  }
  vertical-align: top;
  ${media.tabletOnly`
    width: 43%;
  `}
  ${media.mobileLargeOnly`
    width: 100%;
  `}
  ${media.mobileOnly`
    width: 100%;
  `}
  ${media.belowTablet`
  &:last-child {
    margin-bottom: 28px;
  }`
  }
  
  ${media.aboveTablet`
  &:last-child, &:nth-last-child(2) {
    margin-bottom: 28px;
  }
  `}
`;

export const StyledLabel = styled(Label)`
line-height: 1.25;
`
