import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'

import PostCard from '../../components/Card/PostCard';

Enzyme.configure({adapter: new EnzymeAdapter})

describe('<PostCard/>', ()=>{
  it('Simply Renders', () => {
    const wrapper = shallow(<PostCard className="pc-yo" />)
    /*eslint-disable */
    expect(wrapper.find('.pc-yo')).toHaveLength(1)
    /*eslint-enable */
  });
});