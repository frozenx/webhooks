import React from "react";
import { shallow } from "enzyme";
import CustomTable from "..";
import mockData from "./mockData";

describe("table molecule test cases", () => {
    let mockProps;
    test('should invoke _updateTable on componentDidMount for site', async () => {
        mockProps = {
            columns: mockData.mockSiteColumns,
            rows: mockData.mockSiteRows,
            tabId: 'tab2'
        }
        const wrapper = shallow(<CustomTable {...mockProps}/>)
        const instance = wrapper.instance();
        jest.spyOn(instance, '_updateTable');
        instance.componentDidMount();
        expect(instance._updateTable).toHaveBeenCalled(); 
    })
    test('should invoke _updateTable on componentDidMount for payments', async () => {
        mockProps = {
            columns: mockData.mockPaymentColumns,
            rows: mockData.mockPaymentRows,
            tabId: 'tab3'
        }
        const wrapper = shallow(<CustomTable {...mockProps}/>)
        const instance = wrapper.instance();
        jest.spyOn(instance, '_updateTable');
        instance.componentDidMount();
        expect(instance._updateTable).toHaveBeenCalled(); 
    })
    test('should one of the table item should be selected for site', () => {
        mockProps = {
            columns: mockData.mockSiteColumns,
            rows: mockData.mockSiteRows,
            tabId: 'tab2',
            radioHandleClick: jest.fn()
        }
        const wrapper = shallow(<CustomTable {...mockProps}/>)
        wrapper.setState({checked: 0})
        wrapper.find('Table').props().data.rows[0].rowData[0].props.onChange();
        expect(mockProps.radioHandleClick).toHaveBeenCalled();
    })
    test('should one of the table item should be selected for payments', () => {
        mockProps = {
            columns: mockData.mockPaymentColumns,
            rows: mockData.mockPaymentRows,
            tabId: 'tab3',
            radioHandleClick: jest.fn()
        }
        const wrapper = shallow(<CustomTable {...mockProps}/>)
        wrapper.setState({checked: 0})
        wrapper.find('Table').props().data.rows[0].rowData[0].props.onChange();
        expect(mockProps.radioHandleClick).toHaveBeenCalled();
    })
    test('should trigger the onClick for selecting a site|payment', () => {
        mockProps = {
            columns: mockData.mockSiteColumns,
            rows: mockData.mockSiteRows,
            tabId: 'tab2',
            handleClick: jest.fn()
        }
        const wrapper = shallow(<CustomTable {...mockProps} />) 
        const selectButton = wrapper.find('_default').at(1);
        selectButton.simulate('click');
        expect(mockProps.handleClick).toHaveBeenCalled()
    })
    test('should trigger the onClick for creating a site|payment', () => {
        mockProps = {
            columns: mockData.mockPaymentColumns,
            rows: mockData.mockPaymentRows,
            tabId: 'tab3',
            handleClick: jest.fn()
        }
        const wrapper = shallow(<CustomTable {...mockProps} />) 
        const selectButton = wrapper.find('_default').at(2);
        selectButton.simulate('click');
        expect(mockProps.handleClick).toHaveBeenCalled()
    })
});
