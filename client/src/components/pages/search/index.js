import React, { Component, Fragment } from "react";
import Button from "@beans/button";
import Input from "@beans/input";
import FormGroup from "@beans/form-group";
import i18Data from "../../../languagepack";
import config from "../../../config";
import httpClient from "../../../lib/httpClient";
import {
  SearchIconContainer,
  SearchContainer,
  SearchWithName,
  SearchWithNumber
} from "./styled";
import {
  SecondaryWrapper,
  FormHeading,
  NotificationStyle,
  InputType,
} from "../../../common/styles";
import CardWithPagination from "../../molecules/card";
import Icon from "@beans/icon";
import Loader from "../../atoms/Loader";
import createHistory from "history/createBrowserHistory";
import SearchConfig from "./searchConfig";
import Notification from "@beans/notification";


class SearchSupplier extends Component {
  state = {
    inputs: {
      name: "",
      number: ""
    },
    error: {
      name: "",
      number: ""
    },
    disabled: {
      name: false,
      number: false
    },
    inputValid: true,
    isDataAvailable: false,
    searchResults: [],
    isLoader: false,
    searchMetaData: null,
    cardsData: null,
    isError: false,
    errorMessage: null,
    currentPage: 1,
    searchValue: null,
    searchId: null,
    totalPages: null,
    prevY: 0
  };

  componentWillMount() {
    const state  = this.props.location && this.props.location.state;
    if (state && Object.keys(state).includes("supplierResults")) {
      this.setState(
        {
          isDataAvailable: true,
          searchResults: state.supplierResults.suppliers,
          inputs: {
            ...this.state.inputs,
            name: state.searchedPartnerName
          },
          disabled: {
            ...this.state.disabled,
            number: true
          }
        },
        () => {
          const history = createHistory();
          history.replace({ ...this.props.location, state: undefined });
          this.resolveCardData();
        }
      );
    }
  }

  getSearchResults = (pageNumber = 1) => {    
    const { searchValue, searchId} = this.state;    
    this.searchSupplier(searchValue, searchId, pageNumber, true);
  };

  _onSubmit = (e, currentPage = this.state.currentPage) => {
    e.preventDefault();
    if (this.state.currentPage === this.state.totalPages) {
      return;
    }
    let error = this.state.error;
    let value = this.state.inputs["name"]
      ? this.state.inputs["name"]
      : this.state.inputs["number"];
    let id = this.state.inputs["name"] ? "name" : "number";
    this.setState({
      searchValue: value,
      searchId: id
    });
    if (!this.state.inputs.name && !this.state.inputs.number) {
      error["name"] = i18Data.supplierNameError;
      error["number"] = i18Data.supplierNumberError;
      this.setState({
        inputValid: false,
        error
      });
    } else this.searchSupplier(value, id, currentPage);
  };

  async searchSupplier(value, id, currentPage, isMoreResults) {
    const {
      searchResultsLimit,
      searchQueryParamKeys: { PARTNER_NAME, SUPPLIER_NUMBER, LIMIT, OFFSET }
    } = SearchConfig;
    if (isMoreResults) {
      this.setState({
        isMoreResultsLoading: true
      });
    }
    this.setState({
      isLoader: true
    });
    let error = this.state.error;
    let response;
    if (this.validateInput(value, id)) {
      try {
        const supplierSearchEndPoint = config.endPoints.supplier;      
        if (id == "name") {
          response = await httpClient.get(
            `${supplierSearchEndPoint}?${PARTNER_NAME}=${value}&${LIMIT}=${searchResultsLimit}&${OFFSET}=${currentPage}`
          );
        } else
          response = await httpClient.get(
            `${supplierSearchEndPoint}?${SUPPLIER_NUMBER}=${value}&${LIMIT}=${searchResultsLimit}&${OFFSET}=${currentPage}`
          );
        if (response.status > 400) {
          const error = {
            message: response.message
          };
          throw error;
        }
        if (response.suppliers.length > 0) {
          this.setState(
            {
              searchResults: response.suppliers,
              isDataAvailable: true,
              isLoader: false,
              currentPage: response.offset,
              totalPages: response.totalPages,
              totalCount: response.totalCount
            },
            () => {
              this.resolveCardData();
            }
          );
        } else {
          error[id] = i18Data.supplierNotFound;
          this.setState({
            isLoader: false,
            isDataAvailable: false,
             isMoreResultsLoading: false
          });
        }
      } catch (err) {
        error[id] = i18Data.supplierNotFound;
        this.setState({
          error,
          isLoader: false,
          isDataAvailable: false,
           isMoreResultsLoading: false
        });
      }
    } else {
      this.setState({
        isLoader: false,
        isDataAvailable: false,
        isMoreResultsLoading: false
      });
    }
  }

  resolveCardData = async () => {
    this.setState({
      isLoader: true
    });
    if (!this.state.searchMetaData) {
      const searchMetaDataUrl = config.endPoints.searchMetaData;
      const searchMetaDataResponse = await httpClient.get(searchMetaDataUrl);
      this.setState({
        searchMetaData: searchMetaDataResponse,
        isLoader: false
      });
    }
    const { searchResults, searchMetaData } = this.state;

    const { orderOfFields, groupedKeys, comboKey, keyDelimiter } = SearchConfig;
    const templates = Object.keys(searchMetaData.searchMetaData).map(key => ({
      [key]: null
    }));

    const defaultValues = searchResults.map(o =>
      Object.assign(
        {},
        ...templates,
        ...Object.entries(o).map(([key, value]) => ({
          [key]: value
        }))
      )
    );

    const orderedKeys = defaultValues.map(o => {
      const ordered = {};
      let keys = Object.keys(o).sort(
        (a, b) => orderOfFields.indexOf(a) - orderOfFields.indexOf(b)
      );
      keys.forEach(key => (ordered[key] = o[key]));
      return ordered;
    });

    let changedOne = orderedKeys.map(orderedKey => {
      let searchObj = { fields: [] };
      let orderedKeysAndValues = Object.entries(orderedKey);
      orderedKeysAndValues.forEach(
        ([orderedAttributeKey, orderedAttributeValue]) => {
          if (orderOfFields.includes(orderedAttributeKey)) {
            if (groupedKeys[0].includes(orderedAttributeKey)) {
              let objectConstructor = {};
              let updatingDisplaySearchObject = searchObj.fields.find(
                displaySearchObj => {
                  if (
                    displaySearchObj.hasOwnProperty(comboKey) &&
                    (displaySearchObj.comboKey.includes(groupedKeys[0][0]) ||
                      displaySearchObj.comboKey.includes(groupedKeys[0][1]))
                  ) {
                    objectConstructor = displaySearchObj;
                    return objectConstructor;
                  }
                }
              );
              if (Object.keys(objectConstructor).length > 0) {
                objectConstructor = updatingDisplaySearchObject;
                objectConstructor.comboKey.push(orderedAttributeKey);
                objectConstructor.formatter.keysCollection.push(
                  orderedAttributeKey
                );
                objectConstructor.formatter.valuesCollection.push(
                  orderedAttributeValue
                );
              } else {
                objectConstructor.comboKey = [orderedAttributeKey];
                objectConstructor.formatter = {};
                objectConstructor.formatter.keysCollection = [
                  orderedAttributeKey
                ];
                objectConstructor.formatter.valuesCollection = [
                  orderedAttributeValue
                ];
                objectConstructor.formatter.keysFormatter = array => {
                  let displayNames = array.map(o => {
                    return searchMetaData.searchMetaData[o].displayName;
                  });
                  return displayNames.join(keyDelimiter);
                };
                objectConstructor.formatter.valuesFormatter = array => {
                  let withBrackets = array.map((o, index) => {
                    if (index === 1) {
                      return o ? ` (${o})` : "";
                    }
                    return o ? o : "";
                  });
                  let joinedString = withBrackets.join("").trim();
                  return joinedString;
                };
                searchObj.fields.push(objectConstructor);
              }
            } else if (groupedKeys[1].includes(orderedAttributeKey)) {
              let objectConstructor = {};
              let updatingDisplaySearchObject = searchObj.fields.find(o => {
                if (
                  o.hasOwnProperty(comboKey) &&
                  (o.comboKey.includes(groupedKeys[1][0]) ||
                    o.comboKey.includes(groupedKeys[1][1]))
                ) {
                  objectConstructor = o;
                  return objectConstructor;
                }
              });
              if (Object.keys(objectConstructor).length > 0) {
                objectConstructor = updatingDisplaySearchObject;
                objectConstructor.comboKey.push(orderedAttributeKey);
                objectConstructor.formatter.keysCollection.push(
                  orderedAttributeKey
                );
                objectConstructor.formatter.valuesCollection.push(
                  orderedAttributeValue
                );
              } else {
                objectConstructor.comboKey = [orderedAttributeKey];
                objectConstructor.formatter = {};
                objectConstructor.formatter.keysCollection = [
                  orderedAttributeKey
                ];
                objectConstructor.formatter.valuesCollection = [
                  orderedAttributeValue
                ];
                objectConstructor.formatter.keysFormatter = array => {
                  let displayNames = array.map(o => {
                    return searchMetaData.searchMetaData[o].displayName;
                  });
                  return displayNames.join(keyDelimiter);
                };
                objectConstructor.formatter.valuesFormatter = array => {
                  return array.join(",").replace(/^,|,$/g, "");
                };
                searchObj.fields.push(objectConstructor);
              }
            } else {
              searchObj.fields.push({
                key: orderedAttributeKey,
                value: orderedAttributeValue
              });
            }
          } else {
            searchObj[orderedAttributeKey] = orderedAttributeValue;
          }
        }
      );
      return searchObj;
    });

    this.setState({
      cardsData: changedOne,
      isLoader: false,
      isMoreResultsLoading: false
    });
  };

  _onBlur = e => {
    let value = e.target.value;
    let id = e.target.id;
    this.validateInput(value, id);
  };

  validateInput(value, id) {
    const {
      regex: { nameRegex, numberRegex }
    } = config;
    let error = this.state.error;
    let valid = true;

    if (id == "name" && !nameRegex.test(value)) {
      error[id] = i18Data.invalidSupplierName;
      valid = false;
    } else if (id == "number" && !numberRegex.test(value)) {
      error[id] = i18Data.invalidSupplierNumber;
      valid = false;
    }
    this.setState({
      error
    });
    return valid;
  }

  _onChange = e => {
    let inputs = this.state.inputs;
    let error = this.state.error;
    let disabled = this.state.disabled;

    if (this.state.error["name"] || this.state.error["number"]) {
      error["name"] = "";
      error["number"] = "";
    }

    inputs[e.target.id] = e.target.value;
    if (!inputs["name"] && !inputs["number"]) {
      disabled["name"] = false;
      disabled["number"] = false;
    } else {
      e.target.id == "name" && e.target.value
        ? (disabled["number"] = true)
        : (disabled["name"] = true);
    }
    this.setState({
      inputs,
      error,
      disabled,
      inputValid: true,
      searchResults: [],
      isMoreResultsLoading: false,
      totalPages: null
    });
  };

  _handleViewClick = async (uuid, entityType) => {
    try {
      this.setState({
        isLoader: true,
        isError: false
      });
      const response = await httpClient.post(
        config.endPoints.getPartnerDetails,
        { uuid, entityType }
      );
      if (response.code > 400) {
        const customError = {
          code: response.code,
          message: response.message
        };
        throw customError;
      }
      this.props.history.push({
        pathname: "/tradingpartner/supplier",
        state: {
          supplierHeaderData: response
        }
      });
    } catch (error) {
      this.setState({
        isError: true,
        isLoader: false,
        errorMessage: error.message
      });
    }
  };
  handlePageChange = (nextPage) => {
    this.setState({
        currentPage: nextPage
    });
}

  render() {
    const {
      isDataAvailable,
      isLoader,
      cardsData,
      searchMetaData,
      isError,
      errorMessage,
      isMoreResultsLoading,
      totalCount
    } = this.state;
    return (
      <SecondaryWrapper>
        {isError && errorMessage ? (
          <NotificationStyle>
            <Notification title={errorMessage} variant="error" />
          </NotificationStyle>
        ) : null}
        <FormHeading>
          <h1>{i18Data.heading}</h1>
          <h4 className={!this.state.inputValid && "input-error"}>
            {i18Data.subHeading}
          </h4>
        </FormHeading>
        <form onSubmit={this._onSubmit}>
          <SearchContainer>
            <SearchWithName>
              <FormGroup
                required={true}
                disabled={this.state.disabled.name}
                error={this.state.error.name ? true : false}
                errorMessage={this.state.error.name}
                id="name"
                labelText={i18Data.supplierNameText}
                className="search-label"
              >
                <Input
                  className="name"
                  value={this.state.inputs.name}
                  onChange={this._onChange}
                  placeholder={i18Data.supplierNamePlaceHolder}
                  onBlur={this._onBlur}
                />
              </FormGroup>
              <SearchIconContainer>
                <Button
                  className='search-icon'
                  onClick={this._onSubmit}
                  variant="primary"
                  type="submit"
                >
                  <Icon graphic="search" />
                </Button>
              </SearchIconContainer>
            </SearchWithName>
          </SearchContainer>

          <SearchContainer>
            <SearchWithNumber>
              <FormGroup
                required={true}
                disabled={this.state.disabled.number}
                error={this.state.error.number ? true : false}
                errorMessage={this.state.error.number}
                id="number"
                labelText={i18Data.supplierNumberText}
                className="search-label"
              >
                <Input
                  className="number"
                  value={this.state.inputs.number}
                  onChange={this._onChange}
                  placeholder={i18Data.supplierNumberPlaceHolder}
                  onBlur={this._onBlur}
                />
              </FormGroup>
              <SearchIconContainer className="search-number">
                <Button
                  onClick={this._onSubmit}
                  variant="primary"
                  type="submit"
                  className="last"
                >
                  <Icon graphic="search" />
                </Button>
                <InputType>

                </InputType>
              </SearchIconContainer>
            </SearchWithNumber>
          </SearchContainer>
        </form>
        {isLoader && !isMoreResultsLoading ? <Loader /> : null}
        {isDataAvailable && cardsData ? (
          <CardWithPagination 
              paginationProps = {
                {
                    totalCount,
                    getNewPage: this.getSearchResults, 
                    linkTemplate : "/page=%{pageNumber}",
                    pageText : "Page",
                    currentPage : this.state.currentPage, 
                    handlePageChange : this.handlePageChange
                }
              }
              componentProps = {
                {
                  searchResults: cardsData, 
                  searchMetaData, 
                  handleViewClick: this._handleViewClick, 
                  isMoreResultsLoading
                }
              }
          />
        ) : null}
      </SecondaryWrapper>
    );
  }
}

export default SearchSupplier;