import React from 'react';
import IconButton from '../components/Button/IconButton';
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure ({adapter: new Adapter()})

describe('Rendering', ()=>{
  it('renders please', () => {
    let wrapper = shallow(<IconButton />);
    /*eslint-disable */
    expect(wrapper.find('.someClassName').exists()).toBe(true);
    /*eslint-enable */
  });
});