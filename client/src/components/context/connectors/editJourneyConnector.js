import React, { useContext } from 'react';
import { useApiHook } from '../../hooks';
import FormContext from '../../context';

const EditJourneyConnector = ({ children, url, tabId, ...otherProps }) => {
    const editJourneyValues = useContext(FormContext).values;
    const { isEditJourney } = editJourneyValues[tabId] || {};
    const initialState = editJourneyValues[tabId] || { attributeGroups: [], attributeToRulesMapping: {} };
    const data = useApiHook(url, isEditJourney, initialState);
    return (
        React.cloneElement(children, { ...otherProps, data, tabId })
    )
}

export default EditJourneyConnector;