import React from 'react';
import Header from '..';
import {shallow} from 'enzyme';

const getProps = (additionalProps = {}) => {
  return {
    userName: 'Tesco UserName',
    signOutHandler: jest.fn(),
    name: "OAuthAccessToken",
    ...additionalProps
  };
}

const setup = (additionalProps = {}) =>
  shallow(<Header 
      {...getProps(additionalProps)} 
  />
);

describe('`Header` component', () => {

  it('should render without crashing..', () => {
      const wrapper = setup();

      wrapper.debug();
      expect(wrapper).toMatchSnapshot();
  });

  it('should render the username', async () => { 
    global.fetch = jest.fn().mockImplementation(() => ({
      status: 200,
      json: () => new Promise((resolve, reject) => {
        resolve(({firstName: "John", lastName: "Doe"}))
      }),
    }))
    const wrapper = await shallow(<Header/>)
    await wrapper.update()
    expect(wrapper.find("_default").props().appbar.props.menu[0].text).toBeTruthy()
  })

  it('should throw an error', async () => { 
    global.fetch = jest.fn().mockImplementation(() => ({
      json: () => new Promise((resolve, reject) => {
        reject({message: "error occured"})
      }),
    }))
    const wrapper = await shallow(<Header/>)
    await wrapper.update()
    const textShallow = shallow(wrapper.find("_default").props().appbar.props.menu[0].text)
    expect((textShallow.find(".loading-dots").length)).toBe(1);
  })

  it('should throw internal error ', async () => { 
    global.fetch = jest.fn().mockImplementation(() => ({
      status: 500,
    }))
    const wrapper = await shallow(<Header/>)
    await wrapper.update()
    const textShallow = shallow(wrapper.find("_default").props().appbar.props.menu[0].text)
    expect((textShallow.find(".loading-dots").length)).toBe(1);
  })

  it('should expose signout',  () => { 
    const wrapper =  shallow(<Header/>)
    const shallowAppBar = shallow(wrapper.find("_default").props().appbar)
    window.location.assign = jest.fn();
    shallowAppBar.props().menu[1].onClick()
    expect(window.location.assign).toHaveBeenCalledWith('https://toolkit.tesco.com/sign-in/');
    window.location.assign.mockRestore();
  })

});


