import React from "react";
import { StandaloneLinkWithIcon, StandaloneLink } from '@beans/link';
import AddDetails from './AddDetails';
import { ListWrapper } from "./styled";

const DetailList = props => {
    const {
        attributeGroups,
        handleSupplierForm,
        handleUUID,
        uuid,
        attributeGroupIds,
        node,
        addPayment,
        index
    } = props;
    const isViewMode = node.fields[0].action === 'enabled'; 
    return (
    <React.Fragment>
        <li className='formGroup' onClick={handleUUID(uuid)} key={index}>
            <StandaloneLink disabled={!isViewMode} emphasized={true} variant="standalone">{`Payment terms ${index + 1}`}</StandaloneLink>
            <StandaloneLinkWithIcon
                className='add-icon'
                icon={{ graphic: 'forwardLink', position: { global: 'right' } }}
                emphasized={true}
                onClick={() => handleSupplierForm(node.fields[0], node)}
                    disabled={!isViewMode && node.attributeRules[node.type][node.fields[0]] && !node.attributeRules[node.type][node.fields[0].key].create}
            > {isViewMode ? 'View' : 'Add'}
            </StandaloneLinkWithIcon>
        </li>

    </React.Fragment>
               
                    


               

      
    );
}

export default DetailList;
