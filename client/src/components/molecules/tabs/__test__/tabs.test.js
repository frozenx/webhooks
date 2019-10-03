jest.mock('../../../../lib/httpClient');

import React from 'react';
import Tabs from '..';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import httpClient from '../../../../lib/httpClient';
import config from '../../../../config';
import mockData from './mockData';
import i18Data from '../../../../languagepack';

describe('molecules/tabs', () => {
    describe('Given the component is mounted', () => {
        const mockLocation = {state: {
            uuid: '123',
            version: '1'
        }}
        const mockHistory = {push : jest.fn()}
        beforeEach(() => {
            httpClient.post.mockClear();
        });
        test('then it should render the markup', () => {
            
            const tree = renderer.create(<Tabs location={mockLocation}/>).toJSON();
            expect(tree).toMatchSnapshot();
        });
        test('when the component has error state, it should not render the tabs', (done) => {
            const Wrapper = shallow(<Tabs location={mockLocation}/>);
            Wrapper.setState({ error: 'some error ' });
            setTimeout(() => {
                expect(Wrapper.find('#tabs').length).toEqual(0);
                done();
            }, 0);
        });
        test('when a tab is clicked, it should should update the activeTab state', (done) => {
            const Wrapper = shallow(<Tabs location={mockLocation}/>);
            Wrapper.find('#tabs').simulate('change', { nextTab: { id: 'tab2' } });
            setTimeout(() => {
                expect(Wrapper.state().activeTab).toEqual('tab2');
                done();
            }, 0);
        });
        test('when the submitHandler is invoked, it should call the httpClient post method given form valid is true for tab1', (done) => {
            let mockValues = { key: 'value', status: 'draft', uuid: '123', version: '1' };
            httpClient.post.mockResolvedValue({ data: 'some data' });
            const Wrapper = shallow(<Tabs history={mockHistory} location={mockLocation}/>);
            Wrapper.instance().submitHandler(mockValues, 'draft', true);
            setTimeout(() => {
                expect(httpClient.post).toHaveBeenCalledWith(
                    config.endPoints.supplierHeaderEndPoint,
                    mockValues
                );
                done();
            }, 0);
        });
        test('when the submitHandler is invoked, it should call the httpClient post method given form valid is true for tab2', async (done) => {
            let mockValues = { key: 'value', status: 'draft', siteUuid: '', siteVersion: '', uuid: '123', version: '1' };
            httpClient.post.mockResolvedValue(mockData.createSiteMockData);
            const Wrapper = shallow(<Tabs history={mockHistory} location={mockLocation}/>);
            Wrapper.find('#tabs').simulate('change', { nextTab: { id: 'tab2' } });
            Wrapper.instance().submitHandler(mockValues, 'draft', true);
            setTimeout(async () => {
                expect(httpClient.post).toHaveBeenCalledWith(
                    config.endPoints.supplierSiteEndPoint,
                    mockValues
                );
                done();
            }, 0);
        });
        test('when the submitHandler is invoked, it should call the httpClient post method given form valid is true for tab3', (done) => {
            let mockValues = { key: 'value', status: 'draft', paymentUuid: '', paymentVersion: '', uuid: '', version: '1' };
            httpClient.post.mockResolvedValue(mockData.createPaymentMockData);
            const Wrapper = shallow(<Tabs history={mockHistory} location={mockLocation}/>);
            Wrapper.find('#tabs').simulate('change', { nextTab: { id: 'tab3' } });
            Wrapper.instance().submitHandler(mockValues, 'draft', true);
            setTimeout(() => {
                expect(httpClient.post).toHaveBeenCalledWith(
                    config.endPoints.paymentEndPoint,
                    mockValues
                );
                done();
            }, 0);
        });
        test('when the submitHandler is invoked, it should not call the httpClient post method given form valid is false', (done) => {
            let mockValues = { key: 'val2ue' };
            httpClient.post.mockResolvedValue({ data: 'some data' });
            const Wrapper = shallow(<Tabs location={mockLocation}/>);
            Wrapper.instance().submitHandler(mockValues, 'draft', false);
            setTimeout(() => {
                expect(httpClient.post).not.toHaveBeenCalled();
                done();
            }, 0);
        });
        test('when the updateTabIndicator is invoked, it should set indicator value in state', (done) => {
            const Wrapper = shallow(<Tabs location={mockLocation}/>);
            Wrapper.instance().updateTabIndicator('tab1', 'some value', 'error');
            setTimeout(() => {
                expect(Wrapper.state().tab1).toEqual({ "indicatorValue": "some value", "indicatorVariant": "error" });
                done();
            }, 0);
        })
        xtest("should set the error state given the component catches an error", (done) => {
            let mockValues = { key: 'value' };
            httpClient.post.mockRejectedValue({ data: 'some data' });
            try {
                const Wrapper = shallow(<Tabs location={mockLocation}/>);
                Wrapper.instance().submitHandler(mockValues);
            }
            catch (err) {

                expect(httpClient.post).toHaveBeenCalledWith(
                    "http://localhost:4000/api/header/",
                    JSON.stringify(mockValues)
                );
                expect(Wrapper.find('#tabs').length).toEqual(0);
                done();

            }


        });
        test('when the submitHandler is invoked for tab2 and adding multiple sites ', async (done) => {
            let mockValues = { key: 'value', status: 'draft', siteUuid: '', siteVersion: '', uuid: '123', version: '1' };
            httpClient.post.mockResolvedValue(mockData.createSiteMockData);
            const Wrapper = shallow(<Tabs history={mockHistory} location={mockLocation}/>);
            Wrapper.find('#tabs').simulate('change', { nextTab: { id: 'tab2' } });
            Wrapper.instance().submitHandler(mockValues, 'draft', true);
            Wrapper.setState({ siteRowData: mockData.createSiteExistingData});
            setTimeout(async () => {
                expect(httpClient.post).toHaveBeenCalledWith(
                    config.endPoints.supplierSiteEndPoint,
                    mockValues
                );
                done();
            }, 0);
        }); 
        
        test('when the submitHandler is invoked for tab3 and adding multiple payments ', async (done) => {
            let mockValues = { key: 'value', status: 'draft', paymentUuid: '', paymentVersion: '', uuid: '', version: '1' };
            httpClient.post.mockResolvedValue(mockData.createPaymentMockData);
            const Wrapper = shallow(<Tabs history={mockHistory} location={mockLocation}/>);
            Wrapper.find('#tabs').simulate('change', { nextTab: { id: 'tab3' } });
            Wrapper.instance().submitHandler(mockValues, 'draft', true);
            Wrapper.setState({ paymentRowData: mockData.createPaymentExistingData});
            setTimeout(async () => {
                expect(httpClient.post).toHaveBeenCalledWith(
                    config.endPoints.paymentEndPoint,
                    mockValues
                );
                done();
            }, 0);
        }); 

        test('Should show the preview mode on select of the site after creating site', async () => {
            let mockValues = { key: 'value', status: 'draft', siteUuid: '', siteVersion: '', uuid: '123', version: '1' };
            httpClient.post.mockResolvedValue(mockData.createSiteMockData);
            const Wrapper = shallow(<Tabs history={mockHistory} location={mockLocation}/>);
            Wrapper.find('#tabs').simulate('change', { nextTab: { id: 'tab2' } });
            await Wrapper.instance().submitHandler(mockValues, 'draft', true);
            setTimeout(() => {
                expect(httpClient.post).toHaveBeenCalledWith(
                    config.endPoints.supplierSiteEndPoint,
                    mockValues
                );
                done();
            }, 0);
            const panelContentWrapper = shallow(Wrapper.find('Tabs').props().tabs[1].panelContent);
            expect(panelContentWrapper.find('CustomTable').length).toEqual(1);
            panelContentWrapper.find('CustomTable').prop('handleClick')(i18Data.select, 'tab2');
            panelContentWrapper.find('CustomTable').prop('radioHandleClick')('1234', 'tab2');
        })

        test('Should show the preview mode on select of the payment after creating payment', async () => {
            let mockValues = { key: 'value', status: 'draft', paymentUuid: '', paymentVersion: '', uuid: '', version: '1' };
            httpClient.post.mockResolvedValue(mockData.createPaymentMockData);
            const Wrapper = shallow(<Tabs history={mockHistory} location={mockLocation}/>);
            Wrapper.find('#tabs').simulate('change', { nextTab: { id: 'tab3' } });
            await Wrapper.instance().submitHandler(mockValues, 'draft', true);
            setTimeout(() => {
                expect(httpClient.post).toHaveBeenCalledWith(
                    config.endPoints.paymentEndPoint,
                    mockValues
                );
                done();
            }, 0);
            const panelContentWrapper = shallow(Wrapper.find('Tabs').props().tabs[2].panelContent);
            expect(panelContentWrapper.find('CustomTable').length).toEqual(1);
            panelContentWrapper.find('CustomTable').prop('handleClick')(i18Data.select, 'tab3');
            panelContentWrapper.find('CustomTable').prop('radioHandleClick')('1234', 'tab3');
        })
       
    });
});

