import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import Demo from '../demo';

Enzyme.configure({adapter: new EnzymeAdapter})


describe('Demo renders', ()=>{
  it("renders properly", ()=> {
    const wrapper = shallow(<Demo/>);
    /*eslint-disable */
    expect(wrapper.find('.App').exists()).toBe(true);
    /*eslint-enable */
  });
});