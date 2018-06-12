import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import AdCard from '../../components/Card/AdCard';

Enzyme.configure({adapter: new EnzymeAdapter})


describe('<AdCard/>', ()=>{
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AdCard/>)
    })
  
    it('It renders properly', () => {
      /*eslint-disable */
      console.log(wrapper.debug());
      expect(wrapper).toBeTruthy();
      /*eslint-enable */
    });
  });