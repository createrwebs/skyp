import React from 'react';
import ReactDOM from 'react-dom';
import {FlightCard} from './FlightCard';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';

/*Component contract
-it renders div of class FlightCard that contains everything
-it always renders nothing if no flight given
*/

configure({ adapter: new Adapter() })

describe("App", () => {
  let props;
  let shallowCard;
  const createCard = () => {
    if(!shallowCard){
        shallowCard = shallow(
          <FlightCard {...props} />
        )
    }
    return shallowCard;
  }

  beforeEach(() => {
    props = {
      flight: {routes: [], price: 1000, flyDuration: "11h 45m", route: [] }, 
      currency : "EUR"
    }

    shallowCard = undefined;
  })

  it("renders div of class FlightCard if flight given", () => {
	  const divs = createCard().find(".FlightCard");
	  expect(divs.length).toBe(1);
  })  

  it("renders nothing if no flight given", () =>{
    props = {...props, flight: null};
    expect(createCard().children().length).toEqual(0);
  })
})


