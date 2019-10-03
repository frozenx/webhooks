import React, { Component } from "react";
import Notification from '@beans/notification';
import {
  FormHeading,
  SecondaryWrapper,
  StyleGrayWrapper,
  NotificationStyle,
  PrimaryWrapper
} from "../../../common/styles";
import DetailList from './DetailList';
import PaymentDetailList from './PaymentDetailList';
import SupplierHeader from "./SupplierHeader";
import Label from '@beans/label';
import AppConstants from "../../../languagepack";
import { SupplierStepTwo, HeaderListWrapper, SiteListWrapper, ListWrapper } from "./styled";
import AddDetails from './AddDetails';
import scroller from '../../../lib/scroller';

class SupplierOverview extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    scroller();
  }

  getSuccessTitle = (partnerName, currentFieldName) => {
    return `${partnerName} ${currentFieldName} have been successfully updated`;
  }


  _handleSupplierForm = (selectedAttributeGroup, node) => {
    const { handleStepThree } = this.props
    handleStepThree(selectedAttributeGroup, node)
  }

  _handleUUID = (uuid) => {
    //  console.log(uuid)
  }

  render() {
    const {
      metaData: {
        attributeGroups = [],
        partnerAttributeStatic = {}
      },
      siteMetaData = {},
      paymentMetaData = {},
      attributeGroupIds,
      supplierHeaderData,
      supplierHeaderData: {
        uuid,
        partnerAttributes: {
          partnerName = ''
        }
      },
      rootNode,
      isFormSubmissionSuccessful,
      currentFieldName
    } = this.props;

    return (
      <SupplierStepTwo>
        <SupplierHeader
          staticAttributes={rootNode.partnerStaticAttributes}
          partnerName={(rootNode.partner.values || {}).partnerName || ''}
          values={rootNode.partner.values} />
        <PrimaryWrapper>
          <SecondaryWrapper>
            {isFormSubmissionSuccessful &&
              <NotificationStyle>
                <Notification title={this.getSuccessTitle(rootNode.partner.values.partnerName, currentFieldName)} variant={'success'} />
              </NotificationStyle>
            }
            <FormHeading>
              <h1>{`${rootNode.partner.values.partnerName ? rootNode.partner.values.partnerName : ''} ${AppConstants.supplierDetails}`}</h1>
              <h4>{AppConstants.stepTwoSubTitle}</h4>
            </FormHeading>

            <HeaderListWrapper>
              <DetailList
                attributeGroups={attributeGroups}
                uuid={rootNode.uuid}
                handleUUID={this._handleUUID}
                handleSupplierForm={this._handleSupplierForm}
                attributeGroupIds={attributeGroupIds}
                node={rootNode} />
            </HeaderListWrapper>

            <SiteListWrapper>
              {
                rootNode.children.map((node, nodeIndex) =>
                  <StyleGrayWrapper key={nodeIndex}>
                    <Label
                      dark={true}
                      emphasized={true}
                      className="site-title"> {`${rootNode.partner.values.partnerName} ${AppConstants.siteDetails}`} </Label>
                    <DetailList
                      attributeGroups={siteMetaData.attributeGroups}
                      uuid={rootNode.uuid}
                      handleUUID={this._handleUUID}
                      handleSupplierForm={this._handleSupplierForm}
                      attributeGroupIds={attributeGroupIds}
                      node={node} />

                    <StyleGrayWrapper>
                      <Label
                        dark={true}
                        emphasized={true}
                        className="payment-title"> {AppConstants.paymentDetails}
                      </Label>
                      {
                        node.children.map((paymentNode, index) =>
                          <>
                            <ListWrapper showBorderTop={index}>
                              <ul>
                                <PaymentDetailList
                                  attributeGroups={paymentMetaData.attributeGroups}
                                  uuid={rootNode.uuid}
                                  handleUUID={this._handleUUID}
                                  handleSupplierForm={this._handleSupplierForm}
                                  attributeGroupIds={attributeGroupIds}

                                  node={paymentNode}
                                  index={index}
                                  addPayment={this.props.addPayment} />
                              </ul>
                            </ListWrapper>
                          </>
                        )
                      }
                      <AddDetails
                        title={'Add payment terms'}
                        description={'Payment terms'}
                        addNewSite={() => this.props.addPayment(node)}
                        canAddNewSite={node.isChildEnabled()} />
                    </StyleGrayWrapper>
                  </StyleGrayWrapper>
                )
              }

              {<StyleGrayWrapper>
                <Label
                  dark={true}
                  emphasized={true}
                  className="site-title"> {AppConstants.siteDetails} </Label>
                <AddDetails
                  title={'Add site details'}
                  description={'Site details'}
                  addNewSite={() => this.props.addSite(rootNode)}
                  canAddNewSite={rootNode.isChildEnabled()} />
              </StyleGrayWrapper>}
            </SiteListWrapper>

          </SecondaryWrapper>
        </PrimaryWrapper>
      </SupplierStepTwo>
    );
  }
}

export default SupplierOverview;
