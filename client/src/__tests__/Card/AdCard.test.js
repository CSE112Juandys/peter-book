import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import AdCard from '../../components/Card/AdCard';

Enzyme.configure({adapter: new EnzymeAdapter})


const defaultProps = {
  classes: {
    fullWidth: "asdf"
  }
}

describe('<AdCard />', ()=>{
  it("Should have a class for fullwidth", ()=> {
    const wrapper = mount(<AdCard {...defaultProps} />);
    /*eslint-disable */
    expect(wrapper.find('.asdf').exists()).toBe(true);
    /*eslint-enable */
  })
});


