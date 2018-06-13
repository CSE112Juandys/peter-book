import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import IconButton from '../../components/Button/IconButton';

Enzyme.configure({adapter: new EnzymeAdapter})


const defaultProps = {
  classes: {
    button: "testButton"
  },
  color: "rose", 
  customClass: "",
  disabled: false 
}

describe('<IconButton />', ()=>{
  it("Should have a button class", ()=> {
    const wrapper = mount(<IconButton {...defaultProps} />);
    /*eslint-disable */
    expect(wrapper.find('IconButton.testButton').exists()).toBe(true);
    /*eslint-enable */

  })
});


