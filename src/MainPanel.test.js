import React from 'react';
import ReactDOM from 'react-dom';
import {MainPanel} from './MainPanel';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';

/*Component contract
-it renders div of class MainPanel that contains everything
-it always renders field dateFrom
-it always renders field from
-it always renders filed to
-it shows advanced section if state is set to advance
-it does not show it otherwise
-it show button to close advanced section if it is open
-it shows button to open advanced section if it is not open
*/

configure({ adapter: new Adapter() })

describe("App", () => {
  let props;
  let shallowPanel;
  const createPanel = () => {
    if(!shallowPanel){
        shallowPanel = shallow(
          <MainPanel {...props} />
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

    shallowPanel = undefined
  })

  it("always renders a div of class MainPanel", () => {
	  const divs = createPanel().find(".MainPanel");
	  expect(divs.length).toBeGreaterThan(0);
  })

  it("always renders field from", () => {
    const divs = createPanel().find(".from-field-wrapper");
    expect(divs.length).toBeGreaterThan(0);
  })

  it("always renders field to", () => {
    const elements = createPanel().find(".to-field-wrapper");
    expect(elements.length).toBeGreaterThan(0);
  })

  it("always renders field dateFrom", () => {
    const elements = createPanel().find(".date-from-field-wrapper");
    expect(elements.length).toBeGreaterThan(0);
  })

  it("shows advanced panel if state is set to advanced", () => {
    createPanel().setState({advanced: true});
    const elements = createPanel().find(".advanced-panel-wrapper");
    expect(elements.length).toBeGreaterThan(0);
  })

  it("should not show advanced panel in original state", () => {
    createPanel().setState({advanced: false});
    const elements = createPanel().find(".advanced-panel-wrapper");
    expect(elements.length).toBe(0);
  })

  it("shows close button if advanced panel open", () => {
    createPanel().setState({advanced: true});
    const elements = createPanel().find(".close-adv-panel-btn");
    expect(elements.length).toBe(1);
  })

  it("shows open button if advanced panel closed", () => {
    createPanel().setState({advanced: false});
    const elements = createPanel().find(".show-adv-panel-btn");
    expect(elements.length).toBe(1);
  })

  
})


