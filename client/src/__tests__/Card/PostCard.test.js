import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import PostCard from '../../components/Card/PostCard';

Enzyme.configure({adapter: new EnzymeAdapter})


describe('<PostCard/>', ()=>{
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<PostCard/>)
    })
  
    it('It renders properly', () => {
      /*eslint-disable */
      console.log(wrapper.debug());
      expect(wrapper).toBeTruthy();
      /*eslint-enable */
    });
  });