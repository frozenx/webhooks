import React, { Fragment } from 'react';
import { FormHeading, TopHeading } from '../../../common/styles';
import Label from '@beans/label';
import { HeaderOverview, StyledList, SupplierOverviewContainer } from './styled';

const SupplierHeader = props => {
  const {
    partnerName,
    staticAttributes,
    values
  } = props;
  return (
    <SupplierOverviewContainer>
      <FormHeading>
        <TopHeading><h1>{partnerName}</h1></TopHeading>
      </FormHeading>
      <HeaderOverview>
        <Label dark={true} emphasized={true} className="supplier-title">
          {' '}
          Partner details
        </Label>
        <StyledList>
          {
            staticAttributes.map((staticAttribute, i) => {
              return (
                <li key={`partner-static-attribute-${i}`}>
                  <Label dark={true} emphasized={true}>
                    {staticAttribute.displayName}
                  </Label>
                  <Label>{values[staticAttribute.key]}</Label>
                </li>
              )
            })
          }
        </StyledList>
      </HeaderOverview>
    </SupplierOverviewContainer>
  );
};

export default SupplierHeader;
