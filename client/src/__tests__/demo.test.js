import React from 'react';
import Demo from '../demo';
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure ({adapter: new Adapter()})

describe('Demo renders', ()=>{
  it('renders please', () => {
    let wrapper = shallow(<Demo/>);
    /*eslint-disable */
    expect(wrapper.find('.App').exists()).toBe(true);
    /*eslint-enable */
  });
});