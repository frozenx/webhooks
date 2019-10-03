import React from 'react';
import Accordion from '../../../lib/components/accordion/components/accordion';
import GenericFormContainer from '../../molecules/GenericForm/container';

const AccordionContainer = ({
    attributeGroups,
    currentAccordion,
    indicators,
    setAccordion,
    isClosed
}) => {
    return (        
        <>
            {
                attributeGroups && attributeGroups.map((attrGrp, index) => {
                    return (
                        <>
                            <Accordion
                                id={attrGrp.id}
                                key={index}
                                label={attrGrp.name}
                                className="accordion-attr-grp"
                                open={currentAccordion == attrGrp.name}
                                icon={'expand'}
                                children
                                onChange={(e) => {
                                    if (e.action === 'open' && !isClosed)
                                        setAccordion(attrGrp.name);
                                    else if (e.action === 'close')
                                        setAccordion('');
                                }}
                                showIndicator
                                indicatorText={`${(indicators[attrGrp.name] || {}).value || 0}% Complete`}
                                indicatorVariant={(indicators[attrGrp.name] || {}).variant}
                            >
                                {/* <StyledStatusIndicator className='accordion-group_status-indicator' variant={(indicators[attrGrp.id] || {}).variant || 'error'} /> */}
                                {currentAccordion === attrGrp.name &&
                                    <GenericFormContainer
                                        genericFormData={attrGrp.attributes}
                                        accordionId={currentAccordion}
                                    />
                                }
                            </Accordion>

                        </>
                    )
                })
            }
        </>
    )
}

export default AccordionContainer;