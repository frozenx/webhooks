import { useState, useEffect } from 'react';
import httpClient from '../../lib/httpClient';


const initialDataForAttributes = () => ({ attributeGroups: [], attributeToRulesMapping: {}, isEditJourney: false });

const promiseWrapper = async (url, data, setData) => {
    try {
        const response = await httpClient.get(url);

        setData(response);
    }
    catch (err) {

        setData({});
    }
}

export const useApiHook = (url, isPresetMet, initialState = { attributeGroups: [], attributeToRulesMapping: {} }) => {
    // console.log('payload', payload);
    const [response, setResponse] = useState(initialState);
    useEffect(() => {
        if (!isPresetMet)
            promiseWrapper(url, response, setResponse);
    }, []);
    return response;
};

const promiseWrapperForEditJourney = async (data, setData) => {
    try {
        let response;
        let promiseArray = [];
        promiseArray.push(
            httpClient.get('/tradingpartner/api/supplier-header')
        );
        promiseArray.push(
            httpClient.get('/tradingpartner/api/supplier-header')
        );
        promiseArray.push(
            httpClient.get('/tradingpartner/api/supplier-header')
        );
        response = await Promise.all(promiseArray);
        setData({
            'tab1': { ...response[0], isEditJourney: true },
            'tab2': { ...response[1], isEditJourney: true },
            'tab3': { ...response[2], isEditJourney: true },
        });
    }
    catch (err) {
        setData(data);
    }
}

export const useEditJourneyHook = (supplierId) => {
    const [data, setData] = useState(
        {
            'tab1': initialDataForAttributes(),
            'tab2': initialDataForAttributes(),
            'tab3': initialDataForAttributes()
        });
    useEffect(() => {
        if (supplierId) {
            promiseWrapperForEditJourney(data, setData);
        }
    }, []);
    return data;
}




const getInitialState = (attributeGroups) => {
    const stateObject = {};
    attributeGroups.forEach((attribute) => {
        stateObject[attribute.name] = {};
        attribute.attributes.forEach((attr) => {
            stateObject[attribute.name][attr.key] = '';
        })
    });
    return stateObject;
}

const isValid = (value, rules) => {
    return rules.isRequired ? value && value.match(rules.regexRule) : value.match(rules.regexRule);
}

export const useFormHook = (attributeGroups = [], attributeToRulesMapping = {}) => {
    const initialState = getInitialState(attributeGroups);
    const [values, setValues] = useState(initialState);
    const [errors, setError] = useState(initialState);

    const formHandler = (e, accordionId) => {
        if (e.target) {
            const attributeId = e.target.id;
            let attributeValue;
            let errorValue;
            if (isValid(e.target.value, attributeToRulesMapping[attributeId])) {
                errorValue = '';
                attributeValue = e.target.value;
            } else {
                errorValue = e.target.value;
                attributeValue = '';
            }
            setError({
                ...errors, [accordionId]: { ...errors[accordionId], [attributeId]: errorValue },
            });
            setValues(
                {
                    ...values, [accordionId]: { ...values[accordionId], [attributeId]: attributeValue },
                });
        }
    }
    return [values, errors, formHandler];
}


export const useIndicatorHook = (attributeGroups = [], values, attributeToRulesMapping) => {
    // NOTE - PLEASE RETHINK THIS LOGIC. LOOKS MESSED UP
    const initialState = getInitialState(attributeGroups); // dirty logic . need to rethink
    let indicatorValues = {};
    let averageValue = 0;
    const accordionIds = Object.keys(values);
    accordionIds.forEach((accordionId) => {
        const accordionGroup = values[accordionId];
        const attributeIds = Object.keys(initialState[accordionId]);
        const attributesWithPresetMet = Object.keys(accordionGroup).filter(
            attributeId => isValid(accordionGroup[attributeId], attributeToRulesMapping[attributeId])
        );

        const indicatorPercentage = (attributesWithPresetMet.length / attributeIds.length) * 100;
        averageValue += (indicatorPercentage);
        indicatorValues[accordionId] =
            { value: `${indicatorPercentage.toFixed(0)}`, variant: getVariant(indicatorPercentage) };
    });
    indicatorValues.averageValue = (averageValue / Object.keys(initialState).length).toFixed(0);
    indicatorValues.averageIndicatorVariant = getVariant(indicatorValues.averageValue);
    return indicatorValues;
}

const getVariant = (indicatorPercentage) => {
    if (0 <= indicatorPercentage && indicatorPercentage <= 30)
        return 'error';
    else if (31 <= indicatorPercentage && indicatorPercentage <= 75)
        return 'warning';
    return 'success';

}


export const useFormValidHook = (errors) => {
    return !Object.keys(errors).find((accordion) => {
        return Object.keys(errors[accordion]).find((attribute) => {
            return errors[accordion][attribute].length > 0;
        })
    });
}