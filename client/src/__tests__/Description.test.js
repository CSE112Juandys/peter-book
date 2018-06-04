import React from 'react';
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Description from '../Description';

configure ({adapter: new Adapter()})

describe('<Description />', ()=>{
  it('render please', () => {
    let wrapper = shallow(<Description/>);
    /*eslint-disable */
    expect(wrapper.find('.Description'));
    /*eslint-enable */
  });
});