import React, { Component } from 'react';
import {
  CardContainer,
  DataContainer,
  HeaderContainer,
  BodyContainer,
  BasicDetailContainer,
  LineContainer,
  StyledLabel
} from './styled';
import Label from '@beans/label';
import Button from '@beans/button';
import i18Data from '../../../languagepack';
import SearchConfig from '../../pages/search/searchConfig';
import Loader from '../../atoms/Loader';
import WithPagination from '../PaginationContainer'
import PaginationComponent from '../Pagination'


class Card extends Component {
  
  render() {
    const {
      searchResults,
      searchMetaData,
      handleViewClick,
      isMoreResultsLoading
    } = this.props;

    return (
      <>
        {isMoreResultsLoading ? (
            <Loader/>
        ) : null}
        {searchResults.map((field, index) => {
          return (
            <CardContainer>
              <DataContainer>
                {index === searchResults.length - 1 ? (
                  <HeaderContainer>
                    <Label dark={true} emphasized={true}>
                      <h1>
                        {field.name ? field.name : ''}
                        {field.number ? ` (${field.number})` : ''}
                      </h1>
                    </Label>
                    <Button
                      variant="secondary"
                      onClick={() => handleViewClick(field.uuid, field.entityType)}
                    >
                      {i18Data.view}
                    </Button>
                  </HeaderContainer>
                ) : (
                    <HeaderContainer>
                      <Label dark={true} emphasized={true}>
                        <h1>
                          {field.name ? field.name : ''}
                          {field.number ? ` (${field.number})` : ''}
                        </h1>
                      </Label>
                      <Button
                        variant="secondary"
                        onClick={() => handleViewClick(field.uuid, field.entityType)}
                      >
                        {i18Data.view}
                      </Button>
                    </HeaderContainer>
                  )}
                <BodyContainer>
                  {field.fields.map((displayAttribute, attrIndex) => {
                    if (
                      displayAttribute.hasOwnProperty(SearchConfig.comboKey)
                    ) {
                      return (
                        <BasicDetailContainer>
                          <StyledLabel dark={true} emphasized={true}>
                            {displayAttribute.formatter.keysFormatter(
                              displayAttribute.formatter.keysCollection,
                            )}
                          </StyledLabel>
                          <StyledLabel>
                            {displayAttribute.formatter.valuesFormatter(
                              displayAttribute.formatter.valuesCollection,
                            )}
                          </StyledLabel>
                        </BasicDetailContainer>
                      );
                    }
                    return (
                      <BasicDetailContainer>
                        <StyledLabel dark={true} emphasized={true}>
                          {
                            searchMetaData.searchMetaData[displayAttribute.key]
                              .displayName
                          }
                        </StyledLabel>
                        {displayAttribute.value ? (
                          <StyledLabel>{displayAttribute.value}</StyledLabel>
                        ) : null}
                      </BasicDetailContainer>
                    );
                  })}
                </BodyContainer>
              </DataContainer>
            </CardContainer>
          );
        })}
      </>
    );
  }
}


const SearchCard = WithPagination(PaginationComponent, Card);

export default SearchCard;
