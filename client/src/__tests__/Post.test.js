import React from 'react';
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Post from '../Post';

configure ({adapter: new Adapter()})

describe('<Post />', ()=>{
  it('render please', () => {
    let wrapper = shallow(<Post />);
    /*eslint-disable */
    expect(wrapper.find('.Post'));
    /*eslint-enable */
  });
});