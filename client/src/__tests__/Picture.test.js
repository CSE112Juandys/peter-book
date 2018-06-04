import React from 'react';
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Picture from '../Picture';

configure ({adapter: new Adapter()})

describe('<Picture />', ()=>{
  it('render please', () => {
    let wrapper = shallow(<Picture />);
    /*eslint-disable */
    expect(wrapper.find('.Picture'));
    /*eslint-enable */
  });
});