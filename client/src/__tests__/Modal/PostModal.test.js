import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import PostModal from '../../components/Modal/PostModal';

Enzyme.configure({adapter: new EnzymeAdapter})


describe('<PostModal/>', ()=>{
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<PostModal/>)
    })
  
    it('It renders properly', () => {
      /*eslint-disable */
      // console.log(wrapper.debug());
      expect(wrapper).toBeTruthy();
      /*eslint-enable */
    });
  });