import React from 'react';
import Enzyme, {mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import Header from '../../components/Header/Header';

Enzyme.configure({adapter: new EnzymeAdapter})


const defaultProps = {
  classes: {
    appBar: "foo",
    container: "bar",
    flex: "foobar"
  },
  color: "primary"
}

describe('<Header/>', ()=>{
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<Header {...defaultProps} />)
    })
  
    it('It renders properly', () => {
      /*eslint-disable */
      expect(wrapper.find('.foo').exists()).toBe(true);
      /*eslint-enable */
    });
  });