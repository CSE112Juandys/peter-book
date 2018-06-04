import React from 'react';
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure ({adapter: new Adapter()})
import App from './App';

describe('<App/>', ()=>{
  it('renders please', () => {
    let wrapper = shallow(<App/>)
    /*eslint-disable */
    expect(wrapper.find('.App'))
    /*eslint-enable */
  });
});