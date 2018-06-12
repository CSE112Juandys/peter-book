import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Demo from '../demo';

Enzyme.configure({adapter: new EnzymeAdapter})

describe('Demo renders', ()=>{
  it('renders please', () => {
    let wrapper = shallow(<Demo/>);
    
    /*eslint-disable */
    console.log(wrapper.debug());
    expect(wrapper).toBeTruthy;
    /*eslint-enable */
  });
});