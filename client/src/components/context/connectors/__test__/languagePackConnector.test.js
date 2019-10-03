jest.mock('../../../../lib/cookieManager');

import React from 'react';
import renderer from 'react-test-renderer';
import LanguagePackConnector from '../languagePackConnector';
import cookieManager from '../../../../lib/cookieManager';


describe('languagePackConnector', () => {
    beforeEach(() => {
        cookieManager.readCookie.mockReturnValue('en');
        // global.navigator = { languages: ['en'], language: 'en' };
    });
    afterEach(() => {
        cookieManager.readCookie.mockRestore();
    });
    test('should render the component along with its children given cookie is set', () => {
        const tree = renderer.create(<LanguagePackConnector />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('should render component taking language from navigator given cookie is not set', () => {
        cookieManager.readCookie.mockReturnValue(null);
        const tree = renderer.create(<LanguagePackConnector />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});