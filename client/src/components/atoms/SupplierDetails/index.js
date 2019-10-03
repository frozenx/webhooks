import React from 'react';
import Label from '@beans/label';
import {
    SupplierDetailsContainer,
    SupplierHeader,
    SupplierInfo

} from './style'

const SupplierDetails = props => {

    const {
        supplierData,
        editSupplierData,
        handleEditSupplierDetails
    } = props;

    const normalCase = (string) => {
        let result = string.replace( /([A-Z])/g, " $1" );
        let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return finalResult;
    }
    
    return (
        <SupplierDetailsContainer>
            <SupplierHeader>
                <h2>Supplier Details</h2>
                <div className="edit-supplier" onClick={handleEditSupplierDetails}>Edit</div>
            </SupplierHeader>
            <div>
            {
                supplierData.map((attrGrp, i) => {
                   
                        return (
                            <SupplierInfo key={i}><Label> {normalCase(attrGrp)}</Label><span>{editSupplierData[attrGrp]}</span></SupplierInfo>
                        )                                         
                })
            }
            </div>
        </SupplierDetailsContainer>
    ) 
}


export default SupplierDetails;