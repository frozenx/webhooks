jest.mock('../../../../lib/httpClient');
import React from 'react';
import { shallow } from 'enzyme';
import SupplierOverview from '../index';
import httpClient from '../../../../lib/httpClient';

describe('supplier overview component test cases', () => {
  let Wrapper;
  let mockProps = 
  {
    supplierHeaderData : {
      uuid: '1234'
    },
    partnerName: 'Uni',
    handleStepThree: jest.fn()
  }

  beforeEach(() => {
    Wrapper = shallow(<SupplierOverview {...mockProps}/>);
  });

  it('render the component', () => {
    expect(Wrapper).toMatchSnapshot();
  });
  test('should call the supplier header Api on componentDidMount', () => {  
    const instance = Wrapper.instance();
    jest.spyOn(instance, '_callSupplierHeaderApi');
    instance.componentDidMount();  
    expect(instance._callSupplierHeaderApi).toHaveBeenCalled();
  });
  test('should give a response greater than 400', () => {
    httpClient.get.mockResolvedValue({
      status: 404,
      message: 'error'
    })
    try{
      const instance = Wrapper.instance();
      jest.spyOn(instance, '_callSupplierHeaderApi');
      instance.componentDidMount();
    } catch(error) {
      expect(error.message).toBe('error')
    }            
  })
  test('should give a response less than 400',  async (done) => {
    httpClient.get.mockResolvedValue({
      status: 200,
    })
    const instance = Wrapper.instance();
    jest.spyOn(instance, '_callSupplierHeaderApi');
    instance.componentDidMount();
    await Wrapper.update();
    setTimeout(() => {
      expect(Wrapper.state().displayLoader).toBe(false);
      done()
    },0)
  })

  test('should call the method', () => {
    Wrapper.setState({supplierData: { attributeGroups: [{id: 1}]}})
    const instance = Wrapper.instance();
    jest.spyOn(instance, '_handleSupplierForm');
    instance._handleSupplierForm(1);
    expect(mockProps.handleStepThree).toHaveBeenCalled();

  })
  
});
