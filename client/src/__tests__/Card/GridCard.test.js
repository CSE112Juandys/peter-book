import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import GridCard from '../../components/Card/GridCard';

Enzyme.configure({adapter: new EnzymeAdapter})

describe('<GridCard />', ()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<GridCard />);
  })

  it("Should render properly", ()=> {
    /*eslint-disable */
    expect(wrapper.exists()).toBe(true);
    /*eslint-enable */
  });

});



