import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import RegularButton from '../../components/Button/RegularButton';

Enzyme.configure({adapter: new EnzymeAdapter})


describe('<RegularButton/>', ()=>{
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<RegularButton/>)
    })
  
    it('It renders properly', () => {
      /*eslint-disable */
      console.log(wrapper.debug());
      expect(wrapper).toBeTruthy();
      /*eslint-enable */
    });
  });