import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import Header from '../../components/Header/Header';

Enzyme.configure({adapter: new EnzymeAdapter})


describe('<Header/>', ()=>{
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Header/>)
    })
  
    it('It renders properly', () => {
      /*eslint-disable */
      console.log(wrapper.debug());
      expect(wrapper).toBeTruthy();
      /*eslint-enable */
    });
  });