import {flights, places, mainPage} from './reducers'
import {requestFlights, responseFlightsSucc, responseFlightsErr, requestPlaces, responsePlacesSucc, responsePlacesErr, mainPageSetState} from './actions'

describe("Reducers", () => {

  it('should set is fetching when requesting flights',()=>{
    expect(flights(null,requestFlights()).isFetching).toBeTruthy();
  })

  it('should set the flights when responding to flights',()=>{
    var flightsArray = [{id: 1},{id: 2}];
    expect(flights(null,responseFlightsSucc(flightsArray)).flights).toBe(flightsArray);
  })

  it('should set is fetching when requesting places',()=>{
    expect(places(null,requestPlaces()).isFetching).toBeTruthy();
  })

  it('should set the places when responding to places',()=>{
    var placesArray = [{id: 1},{id: 2}];
    expect(places(null,responsePlacesSucc(placesArray)).places).toBe(placesArray);
  })

  it('should unset fetching flights if responding with error ',()=>{
    var state = flights(null,requestFlights());
    expect(flights(state,responseFlightsErr()).isFetching).toBeFalsy();
  })

  it('should unset fetching places if responding with error ',()=>{
    var state = places(null,requestPlaces());
    expect(places(state,responsePlacesErr()).isFetching).toBeFalsy();
  })

  it('should set everything into main page state in one pass',()=>{
    var state = {
      flyFrom: [{id:1},{id:2}], 
      to: [{id:3},{id:4}], 
      passengers: 5, 
      sort: 'quality', 
      onlyWeekends: true, 
      onlyWorkingDays: true, 
      directFlights: true, 
      dateFrom: new Date(), 
      dateTo: new Date()
    }
    expect(mainPage(null,mainPageSetState(state))).toEqual(state);
  })


});