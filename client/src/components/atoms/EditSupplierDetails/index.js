import React, { Component } from 'react';

import Button from '@beans/button';
import Input from '@beans/input';
import Label from '@beans/label';
import {
    SupplierDetailsContainer,
    SupplierHeader,
    SupplierInfo
} from '../SupplierDetails/style'

export class EditSupplierDetails extends Component {
    
    constructor(props){
        super(props);
        this.state = {};
    }

    normalCase = (string) => {
        let result = string.replace( /([A-Z])/g, " $1" );
        let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return finalResult;
    }
    
    render(){
        return(
            <SupplierDetailsContainer >
                <form onChange  ={(e) => this.props.handleSupplierChange(e)}>
                <SupplierHeader>
                    <h2>Supplier Details</h2>
                    <Button
                        variant = "primary"
                        className = "submit-btn"
                        onClick={this.props.handleSubmitSupplierDetails}
                        type = "submit"> Submit
                    </Button>
                    <Button
                        variant = "primary"
                        className = "cansel-btn"
                        onClick={this.props.handleCanselSupplierDetails}
                        type = "submit"> Cancel
                    </Button>
            </SupplierHeader>
            <div>
            {
                this.props.supplierData.map((attrGrp, i) => {
                    return (
                        <SupplierInfo key={i}><Label>{this.normalCase(attrGrp)}</Label>
                            <div> 
                                <Input
                                    type = "text" 
                                    id={i}
                                    defaultValue={this.props.editSupplierData[attrGrp] || ""}
                                    name = {attrGrp}
                                />
                            </div>
                        </SupplierInfo>
                    )                                         
                })
            }
            </div>
            </form>
            </SupplierDetailsContainer>
        )
    }
}

export default EditSupplierDetails;