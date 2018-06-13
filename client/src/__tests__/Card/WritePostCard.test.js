import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import WritePostCard from '../../components/Card/WritePostCard';

Enzyme.configure({adapter: new EnzymeAdapter})


describe('<WritePostCard/>', ()=>{
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<WritePostCard/>)
    })
  
    it('It renders properly', () => {
      /*eslint-disable */
      // console.log(wrapper.debug());
      expect(wrapper).toBeTruthy();
      /*eslint-enable */
    });
  });