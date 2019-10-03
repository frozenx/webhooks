import React from 'react';
import Loader from '../';

import Enzyme, {shallow} from 'enzyme';



describe('render Loader component inside index file', () =>{
    let Wrapper;
    
    beforeEach(() => {
        
         Wrapper = shallow(<Loader />);
    });

    it('renders the Loader component', () => {
        expect(Wrapper).toMatchSnapshot();
    });

});