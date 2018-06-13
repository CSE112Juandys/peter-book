import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import PostListItem from '../../components/ListItem/PostListItem';

Enzyme.configure({adapter: new EnzymeAdapter})


describe('<PostListItem/>', ()=>{
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<PostListItem/>)
    })
  
    it('It renders properly', () => {
      /*eslint-disable */
      // console.log(wrapper.debug());
      expect(wrapper).toBeTruthy();
      /*eslint-enable */
    });
  });