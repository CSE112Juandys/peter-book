import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import PostList from '../../components/List/PostList';

Enzyme.configure({adapter: new EnzymeAdapter})


describe('<PostList/>', ()=>{
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<PostList />)
    })
  
    it('It renders properly', () => {
      /*eslint-disable */
      expect(wrapper.exists()).toBe(true);
      /*eslint-enable */
    });
  });