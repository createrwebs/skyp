import React from 'react';
import ReactDOM from 'react-dom';
import {AdvancedPanel} from './AdvancedPanel';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';

/*Component contract
-it renders div of class AdvancedPanel that contains everything
*/

configure({ adapter: new Adapter() });

describe("App", () => {
  let props;
  let shallowPanel;
  const createPanel = () => {
    if(!shallowPanel){
        shallowPanel = shallow(
          <AdvancedPanel {...props} />
        )
    }
    return shallowPanel;
  }

  beforeEach(() => {
    props = {
      places: [], 
      flyFrom: [], 
      to: [], 
      passengers: 1, 
      sort: 'price', 
      onlyWeekends: false, 
      onlyWorkingDays: false, 
      directFlights: false, 
      dateFrom: null, 
      dateTo: null
    }

    shallowPanel = undefined;
  })

  it("always renders a div of class AdvancedPanel", () => {
	  const divs = createPanel().find(".AdvancedPanel");
	  expect(divs.length).toBeGreaterThan(0);
  })  
})


