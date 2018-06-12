import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import IconButton from '../../components/Button/IconButton';

Enzyme.configure({adapter: new EnzymeAdapter})


describe('<IconButton/>', ()=>{
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<IconButton/>)
    })
  
    it('It renders properly', () => {
      /*eslint-disable */
      console.log(wrapper.debug());
      expect(wrapper).toBeTruthy();
      /*eslint-enable */
    });
  });