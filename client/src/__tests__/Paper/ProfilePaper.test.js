import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import ProfilePaper from '../../components/Paper/ProfilePaper';

Enzyme.configure({adapter: new EnzymeAdapter})


describe('<ProfilePaper/>', ()=>{
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ProfilePaper/>)
    })
  
    it('It renders properly', () => {
      /*eslint-disable */
      // console.log(wrapper.debug());
      expect(wrapper).toBeTruthy();
      /*eslint-enable */
    });
  });