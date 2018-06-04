import React from 'react';
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import About from '../About';

configure ({adapter: new Adapter()})

describe('<About />', ()=>{
  it('render please', () => {
    let wrapper = shallow(<About/>);
    /*eslint-disable */
    expect(wrapper.find('.About'));
    /*eslint-enable */
  });
});