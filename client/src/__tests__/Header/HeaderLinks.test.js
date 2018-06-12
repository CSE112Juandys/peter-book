import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import HeaderLinks from '../../components/Header/HeaderLinks';

Enzyme.configure({adapter: new EnzymeAdapter})


describe('<HeaderLinks/>', ()=>{
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<HeaderLinks/>)
    })
  
    it('It renders properly', () => {
      /*eslint-disable */
      console.log(wrapper.debug());
      expect(wrapper).toBeTruthy();
      /*eslint-enable */
    });
  });