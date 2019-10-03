import React from 'react';
import App from './App';
import {shallow} from 'enzyme'

describe('renders without crashing', () => {
  let Wrapper = shallow(<App />);
  it('renders app component', () => {
    expect(Wrapper).toMatchSnapshot();
  });
})

