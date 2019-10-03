import React, { Fragment } from 'react';
import { FormHeading, FormHeadingWrapper, StyleGrayWrapper } from "../../../common/styles";
import Label from '@beans/label';
import Button from '@beans/button';
import i18Data from '../../../languagepack';

import {
    CardTopContainer,
    CardBottomContainer,
    StyledLeftSection,
    StyledRightSection,
    IconStyle
} from '../../../common/styles'
import StatusIndicator from '@beans/colleague-status-indicator';
import Dropdown from '@beans/dropdown';
import Icon from '@beans/icon';
import { DropdownWrapper } from './styled'


export default class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressTypes: {
                primaryAddress: {},
                orderingAddress: {},
                remmitanceAddress: {},
                rfqBiddingAddress: {},
                shippingAddress: {},
            },
            editAddress: false,
            editAddressStatus: false,
            showLoader: false
        }
    }
    getAddress = (uuid) => {
        let currentAddress = this.props.rootNode.addressBook.getAddress(uuid);
        if (currentAddress) {
            let { isActive, address1, address2, address3, addressUuid } = currentAddress;
            address2 = address2 || '';
            address3 = address3 || '';
            let addressName = `${address1},${address2},${address3}`
            let address = { isActive, addressName, addressUuid }
            return address
        }
        return {};
    }

    componentDidMount() {
        let savedAddressTypes = this.props.node.address.values;
        let addressTypes = { ...this.state.addressTypes }
        let isSavedAddressTypesEmpty = Object.keys(savedAddressTypes).every((addressType) => !savedAddressTypes[addressType])
        if (!isSavedAddressTypesEmpty) {
            Object.keys(savedAddressTypes).map((address, i) => {
                if (savedAddressTypes[address]) {
                    addressTypes[address] = this.getAddress(savedAddressTypes[address])
                }
            })
            this.setState({
                addressTypes,
                isAddressTypesPresent: true
            })
        }
        else {
            this.setState({
                isAddressTypesPresent: false
            })
        }
    }
    onChange = (addressType, e) => {
        let address = this.getAddress(e.target.value)
        let addressTypes = this.state.addressTypes
        addressTypes[addressType.id] = address

        this.setState({
            addressTypes,
            isAddressTypesPresent: true
        }, () => {
            this.props.editSiteAddresses(false)
            this.props.siteAddressData(this.state.addressTypes);
        })
    }

    updateAddress = (addressType) => {
        let updatedAddressTypes = { ...this.state.addressTypes }
        updatedAddressTypes[addressType.id] = {}
        this.setState({
            addressTypes: updatedAddressTypes
        }, () => {
            this.props.siteAddressData(this.state.addressTypes)
        }
        );
    }


    render() {
        const {
            addresses,
            addressList,
            rootNode,
            node,
            editSiteAddresses,
            iseditSiteAddressesEnable
        } = this.props
        const {
            isAddressTypesPresent
        } = this.state;
        return (
            <Fragment>
                <FormHeadingWrapper>
                    <FormHeading><h1>{`${rootNode.partner.values.partnerName} site addresses`}</h1></FormHeading>
                    <Button disabled={iseditSiteAddressesEnable || !isAddressTypesPresent} onClick={() => editSiteAddresses(true)} variant='secondary'>Edit site addresses </Button>
                </FormHeadingWrapper>
                {addressList.map((address, index) => {
                    let addressType = this.state.addressTypes[address.id];
                    return <StyleGrayWrapper key={index}>
                        <CardTopContainer>
                            <Label dark={true} emphasized={true}>{address.label}</Label>
                            <Button disabled={iseditSiteAddressesEnable} variant="secondary">
                                {i18Data.view}
                            </Button>
                        </CardTopContainer>
                        <CardBottomContainer>
                            {
                                (addressType && addressType.addressName) &&
                                <>
                                    <StyledLeftSection spaceBottom>
                                        <Label dark={true} emphasized={true} >{!iseditSiteAddressesEnable ? i18Data.address : 'Current address'}</Label>
                                        <Label>
                                            {addressType && addressType.addressName}
                                            {iseditSiteAddressesEnable && <IconStyle onClick={() => this.updateAddress(address)}><Icon graphic="close" size="xs" /></IconStyle>}
                                        </Label>
                                    </StyledLeftSection>
                                    {!iseditSiteAddressesEnable &&
                                        <StyledRightSection>
                                            <Label dark={true} emphasized={true}>{i18Data.status}</Label>
                                            <Label>
                                                {
                                                    <StatusIndicator variant={addressType && addressType.isActive === 'Active' ? "success" : "error"}>
                                                        {addressType && addressType.isActive || "Inactive"}
                                                    </StatusIndicator>
                                                }
                                            </Label>
                                        </StyledRightSection>
                                    }
                                </>
                            }
                            {
                                (addressType && !addressType.addressName || iseditSiteAddressesEnable) &&
                                <DropdownWrapper>
                                    <Label dark={true} emphasized={true}>
                                        {iseditSiteAddressesEnable ? 'Assign a different address' : 'Assign address'}
                                    </Label>
                                    <Dropdown
                                        onChange={(e) => this.onChange(address, e)}
                                        defaultValue='select'
                                        id={index}
                                        value={addressType.uuid || 'select'}
                                    >
                                        <option value="select">Select address</option>
                                        {addresses && addresses.map((address, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <option value={address.addressUuid} id={address.addressUuid} index={index}>
                                                        {`${address.address1},${address.address2},${address.address3}`}
                                                    </option>
                                                </Fragment>
                                            )
                                        })}
                                    </Dropdown>
                                </DropdownWrapper>
                            }

                        </CardBottomContainer>
                    </StyleGrayWrapper>
                }

                )}
            </Fragment>)
    }
}
