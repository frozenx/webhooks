import React, { Component } from "react";
import { FormHeading, SecondaryWrapper, NotificationStyle } from "../../../common/styles";
import { CreateSupplierWrapper } from "./styled";
import { LanguagePack } from '../../context';
import Button from "@beans/button";
import Notification from "@beans/notification";
import GenericFormContainer from "../../molecules/GenericForm/container";
import config from '../../../config/';
import httpClient from '../../../lib/httpClient';
import Loader from "../../../components/atoms/Loader";
import constants from './constants'

class CreateSupplier extends Component {
  state = {
    values: {},
    errorStatus: {},
    regex: {},
    required: {},
    submitButtonStatus: false,
    supplierHeaderData: [],
    showStepTwo: false,
    showStepThree: false,
    showStepOne: true,
    displayLoader: false,
    displayErrorStatus: false,
    displayErrorMessage: null,
    supplierMetaDataHeader: null,
    partnerName: null
  };

  async componentWillMount() {
    const { partnerNumber } = constants
    this.setState({
      displayLoader: true
    });
    try {
      const response = await httpClient.get(
        config.endPoints.supplierHeaderEndPoint
      );
      if (response.status > 400) {
        const customError = {
          message: response.message
        };
        throw customError;
      }
      const filteredSupplierMetaDataHeader = response.partnerAttributeStatic.attributes.filter((attribute) => attribute.key !== partnerNumber);
      this.setState({
        displayLoader: false,
        supplierMetaDataHeader: filteredSupplierMetaDataHeader,
        attributeRules: response.attributeToRulesMapping
      });
    } catch (error) {
      this.setState({
        displayLoader: false,
        displayErrorStatus: true,
        displayErrorMessage: error.message
      });
    }

    let selectedAttr, selectedAttrErrStatus, selectedAttrRegex, selectedAttrRequired;
    const { supplierMetaDataHeader, attributeRules } = this.state;
    if (supplierMetaDataHeader && supplierMetaDataHeader.length > 0) {
      supplierMetaDataHeader.forEach(attr => {
        selectedAttr = { ...selectedAttr };
        selectedAttr[attr.key] = attr.value;
        selectedAttrErrStatus = { ...selectedAttrErrStatus };
        selectedAttrErrStatus[attr.key] = false;
        selectedAttrRegex = { ...selectedAttrRegex };
        selectedAttrRegex[attr.key] = attributeRules[attr.key].regexRule;
        selectedAttrRequired = { ...selectedAttrRequired };
        selectedAttrRequired[attr.key] = attributeRules[attr.key].required;
        return { selectedAttr, selectedAttrErrStatus, selectedAttrRegex, selectedAttrRequired };
      });
      this.setState({
        values: selectedAttr,
        errorStatus: selectedAttrErrStatus,
        regex: selectedAttrRegex,
        required: selectedAttrRequired,
        createSupplierData: supplierMetaDataHeader
      });
    }
  }


  _handleChange = e => {
    const initalValues = {};
    const { id, value } = e.target;
    if (config.forceCapitalizationAttributes[id]) {
      initalValues[id] = value.toUpperCase();
    } else {
      initalValues[id] = value
    }
    const initialErrorStatus = {};
    const initialRegex = { ...this.state.regex };
    const initialRequired = { ...this.state.required };
    if ((!value && initialRequired[id]) || !new RegExp(initialRegex[id]).test(value)) {
      initialErrorStatus[id] = true;
    } else {
      initialErrorStatus[id] = false
    }

    this.setState(prevState => ({
      isSupplierFound: false,
      values: { ...prevState.values, ...initalValues },
      errorStatus: { ...prevState.errorStatus, ...initialErrorStatus }
    }))

  }

  _handleValidation() {
    let tempValues = { ...this.state.values };
    let tempErrStatus = { ...this.state.errorStatus };
    let tempRegex = { ...this.state.regex };
    let tempRequired = { ...this.state.required };
    let formIsValid = true;
    Object.keys(tempValues).forEach(key => {
      if ((!tempValues[key] && tempRequired[key]) || !new RegExp(tempRegex[key]).test(tempValues[key])) {
        tempErrStatus[key] = true;
        formIsValid = false;
      } else {
        tempErrStatus[key] = false;
      }
    });

    this.setState(prevState => ({
      errorStatus: { ...prevState.errorStatus, ...tempErrStatus }
    }));

    return formIsValid;
  }

  _handleSubmit = async e => {
    e.preventDefault();
    let validate = this._handleValidation();
    if (validate) {
      const formData = this.state.values;      
      const searchSupplierUrl = `${config.endPoints.searchAndCreate}`
      this.setState({ displayLoader: true });
      try {
        const searchResults = await httpClient.post(searchSupplierUrl, formData);
        if (searchResults.suppliers) {
          this.setState({ isSupplierExists: true, isCompanyAddressError: false, searchResults: searchResults })
          setTimeout(() => {
            this.props.history.push({ pathname: '/tradingpartner', state: { supplierResults: this.state.searchResults, searchedPartnerName: formData.partnerName } })
          }, 1000)
        } else if (searchResults.errorKeys) {
          const errors = searchResults.errorKeys.reduce((errorObject, errorKey) => {
            return { ...errorObject, [errorKey]: true }
          }, { ...this.state.errorStatus });
          this.setState({
            errorStatus: { ...errors },
            isCompanyAddressError: true,
            displayLoader: false,
          });
        } else {
          this.props.history.push({ pathname: '/tradingpartner/supplier', state: { supplierHeaderData: searchResults } })
          this.setState({
            displayLoader: false,
            showStepOne: false,
            showStepTwo: true,
            supplierHeaderData: searchResults,
          });
        }
      } catch (err) {
      }
    } else {
    }
  };

  _handleAttributeChange = () => {}

  render() {
    const {
      displayLoader,
      values,
      errorStatus,
      showStepOne,
      isCompanyAddressError,
      isSupplierExists,
      createSupplierData,
    } = this.state;

    const i18Data = this.context;
    return (
      <>
        {displayLoader ? <Loader /> : null}
        {showStepOne ? (
          <SecondaryWrapper>
            {
              createSupplierData && createSupplierData.length > 0 ?
                <CreateSupplierWrapper>
                  <FormHeading>
                    <h1>{i18Data.CREATE_NEW_SUPPLIER_TEXT}</h1>
                    <h4>{i18Data.CREATE_NEW_SUPPLIER_SUBTEXT}</h4>
                  </FormHeading>
                  <form
                    onChange={e => this._handleChange(e)}
                  >
                    {isSupplierExists &&
                      <NotificationStyle>
                        <Notification title={'Supplier already exists'} variant={'error'} className='notification' />
                      </NotificationStyle>
                    }
                    {
                      isCompanyAddressError &&
                      <NotificationStyle>
                        <Notification title={'Company number entered is invalid'} variant={'error'} className='notification' />
                      </NotificationStyle>
                    }
                    <GenericFormContainer
                      genericFormData={this.state.createSupplierData}
                      values={values}
                      errors={errorStatus}
                      submitButtonStatus={this.state.submitButtonStatus}
                      attributeToRulesMapping={this.state.attributeRules}
                      handleAttributeChange={this._handleAttributeChange}
                    />
                    <Button
                      variant="primary"
                      className={`submit-btn`}
                      type="submit"
                      onClick={this._handleSubmit}>
                      {i18Data.CONFIRM_BTN}
                    </Button>
                  </form>
                </CreateSupplierWrapper>
                :
                null
            }
          </SecondaryWrapper>
        )
          : null}
      </>
    );
  }
}

CreateSupplier.contextType = LanguagePack;

export default CreateSupplier;
