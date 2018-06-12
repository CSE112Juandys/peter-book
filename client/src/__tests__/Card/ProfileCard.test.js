import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import ProfileCard from '../../components/Card/ProfileCard';

Enzyme.configure({adapter: new EnzymeAdapter})


describe('<ProfileCard/>', ()=>{
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProfileCard/>)
    })
  
    it('It renders properly', () => {
      /*eslint-disable */
      console.log(wrapper.debug());
      expect(wrapper).toBeTruthy();
      /*eslint-enable */
    });
  });