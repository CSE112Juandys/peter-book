import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import Sidebar from '../../components/Sidebar/Sidebar';

Enzyme.configure({adapter: new EnzymeAdapter})


describe('<Sidebar/>', ()=>{
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Sidebar/>)
    })
  
    it('It renders properly', () => {
      /*eslint-disable */
      // console.log(wrapper.debug());
      expect(wrapper).toBeTruthy();
      /*eslint-enable */
    });
  });