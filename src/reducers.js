import { REQUEST_FLIGHTS } from './actions'
import { RESPONSE_FLIGHTS_SUCC } from './actions'
import { RESPONSE_FLIGHTS_ERR } from './actions'
import { REQUEST_PLACES } from './actions'
import { RESPONSE_PLACES_SUCC } from './actions'
import { RESPONSE_PLACES_ERR } from './actions'
import { MAIN_PAGE_SET_STATE } from './actions'
import { combineReducers } from 'redux'

export function flights (state = {currency: "EUR", flights: [],isFetching: null, didInvalidate: false, updatedAt: null}, action){
	switch (action.type){
		case REQUEST_FLIGHTS : 
			return Object.assign({}, state, {isFetching: action})
		case RESPONSE_FLIGHTS_ERR : 
			return Object.assign({}, state, {isFetching: null})
		case RESPONSE_FLIGHTS_SUCC : 
			return Object.assign({}, state, {flights: action.flights, isFetching: null})
		default: 
			return state
	}
}

export function places (state = {places:[],isFetching: null, didInvalidate: false, updatedAt: null}, action){
	switch (action.type){
		case REQUEST_PLACES : 
			return Object.assign({}, state , {isFetching: action})
		case RESPONSE_PLACES_ERR : 
			return Object.assign({}, state, {isFetching: null})
		case RESPONSE_PLACES_SUCC : 
			return Object.assign({}, state, {places: action.places, isFetching: null})
		default: 
			return state
	}
}

export function mainPage(state = {flyFrom: [], to: [], passengers: 1, sort: 'price', onlyWeekends: false, onlyWorkingDays: false, directFlights: false, dateFrom: null, dateTo: null, returnFrom: null, returnTo: null},action){
	switch(action.type){
		case MAIN_PAGE_SET_STATE :
			return Object.assign({}, state , action.state)
		default: 
			return state
	}
}
const rootReducer = combineReducers({flights: flights, places: places, mainPage: mainPage})
export default rootReducer