import React from "react";
import { StandaloneLinkWithIcon, StandaloneLink } from '@beans/link';
import { ListWrapper } from "./styled";

const DetailList = props => {
    const {
        attributeGroups,
        handleSupplierForm,
        handleUUID,
        uuid,
        attributeGroupIds,
        node
    } = props;
    return (
        <ListWrapper>
            <ul>
                {node.fields && node.fields.map((attrGrp, index) => {
                    let {
                        id: formId,
                        name
                    } = attrGrp;
                    const isViewMode = attrGrp.action === 'enabled';
                    return (
                        <li className='formGroup' onClick={handleUUID(uuid)} key={index}>
                            <StandaloneLink disabled={!isViewMode} emphasized={true} variant="standalone">{name}</StandaloneLink>
                            <StandaloneLinkWithIcon
                                className='add-icon'
                                icon={{ graphic: 'forwardLink', position: { global: 'right' } }}
                                emphasized={true}
                                onClick={() => handleSupplierForm(attrGrp, node)}
                                disabled={!isViewMode && node.attributeRules[node.type][attrGrp.key] && !node.attributeRules[node.type][attrGrp.key].create}
                            > {isViewMode ? 'View' : 'Add'}
                            </StandaloneLinkWithIcon>
                        </li>
                    )
                })}
            </ul>
        </ListWrapper>
    );
}

export default DetailList;
