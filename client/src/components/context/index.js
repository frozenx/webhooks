import React from 'react';
import languagePack from '../../languagepack';

export const FormContext = React.createContext({
    values: {},
    errors: {},
});


export const LanguagePack = React.createContext(languagePack.en);


export default FormContext;

