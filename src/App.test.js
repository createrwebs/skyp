import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';

/*Component contract
-it renders div of class app
-everything is in this div
-it always renders main controll panel
-if there are some flights it renders a list of them
-if there are no flights it renders message that there are no flights
-if it is fetching flights it does not render anything
-it shows progress bar if fetching
*/

configure({ adapter: new Adapter() })

describe("App", () => {
  let props;
  let shallowApp;
  const createApp = () => {
  	if(!shallowApp){
      shallowApp = shallow(
        <App {...props} />
      );
 	}
	return shallowApp;
  }

  beforeEach(() => {
    props = {
	  isFetching: false, 
      flights: [],
      places: [],
      mainPage: {flyFrom: [], to: [], passengers: 1, sort: 'price', onlyWeekends: false, onlyWorkingDays: false, directFlights: false, dateFrom: null, dateTo: null}
    }

    shallowApp = undefined
  })

  it("always renders a div of class app", () => {
	  const divs = createApp().find(".App");
	  expect(divs.length).toBeGreaterThan(0);
  })

  it("contains everything else that gets rendered", () => {
    const divs = createApp().find(".App");
    const wrappingDiv = divs.first();
    expect(wrappingDiv.children()).toEqual(createApp().children());
  })

  it("always renders some main control panel" , () =>{
  	const elements = createApp().find(".main-panel-wrapper");
  	expect(elements.length).toBeGreaterThan(0);
  })

  it("it renders list of flights if there are some" , () =>{
    props = {...props,flights: [{id: 20}]};
  	const elements = createApp().find(".flight-list-wrapper");
  	expect(elements.length).toBeGreaterThan(0);
  })

  it("it renders message if there are no flights" , () =>{
  	const elements = createApp().find(".not-found-wrapper");
  	expect(elements.length).toBeGreaterThan(0);
  })

  it("it does not render message if fetching flights", () => {
    props = {...props, isFetching: true};
  	const elements = createApp().find(".not-found-wrapper");
  	expect(elements.length).toBe(0);
  })

  it("shows progress bar if fetching", () => {
	props = {...props, isFetching: true};
  	const elements = createApp().find(".progress-bar-wrapper");
  	expect(elements.length).toBe(1);  
  })
})


