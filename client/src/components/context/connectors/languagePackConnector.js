import React from 'react'
import { LanguagePack } from '../../context';
import languagePack from '../../../languagepack';
import cookieManager from '../../../lib/cookieManager';

const LanguagePackConnector = ({ children }) => {
    const browserLanguagePreference = (navigator.languages && navigator.languages[0]) || navigator.language;
    const cookieLanguage = cookieManager.readCookie("language");
    const languagePreference = cookieLanguage ? cookieLanguage : browserLanguagePreference;
    return (
        <LanguagePack.Provider value={languagePack[languagePreference] || languagePack.en}>
            {children}
        </LanguagePack.Provider>
    )
}

export default LanguagePackConnector;
