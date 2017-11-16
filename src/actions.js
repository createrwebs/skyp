import moment from 'moment'

export const REQUEST_FLIGHTS = "REQUEST_FLIGHTS" 
export const RESPONSE_FLIGHTS_ERR = "RESPONSE_FLIGHTS_ERR"
export const RESPONSE_FLIGHTS_SUCC = "RESPONSE_FLIGHTS_SUCC"

export const REQUEST_PLACES = "REQUEST_PLACES"
export const RESPONSE_PLACES_SUCC = "REQUEST_PLACES_SUCC"
export const RESPONSE_PLACES_ERR = "REQUEST_PLACES_ERR"

export const MAIN_PAGE_SET_STATE = "MAIN_PAGE_SET_STATE"

export function requestFlights(){
	return{ type: REQUEST_FLIGHTS}
}

export function responseFlightsSucc(flights){
	return { 
		type: RESPONSE_FLIGHTS_SUCC,
		flights
	}
}

export function responseFlightsErr(){
	return{ 
		type: RESPONSE_FLIGHTS_ERR
	}
}

export function requestPlaces(){
	return{ type: REQUEST_PLACES}
}

export function responsePlacesSucc(places){
	return { 
		type: RESPONSE_PLACES_SUCC,
		places
	}
}

export function responsePlacesErr(){
	return{ 
		type: RESPONSE_PLACES_ERR
	}
}

export function mainPageSetState(state){
	return{
		type: MAIN_PAGE_SET_STATE,
		state
	}
}

export function fetchPlacesForSuggestions(query){
	return dispatch => {
		dispatch(requestPlaces())
		return fetch('https://api.skypicker.com/places?term='+query+'&v=2&locale=en')
		.then(
            response => response.json(),
			error => dispatch(responsePlacesErr())
		)
		.then(
			places => {return dispatch(responsePlacesSucc(places))}
		)
	}
}

export function fetchFlights(params){
	var paramsCopy = Object.assign({}, params) 

	paramsCopy.dateFrom = moment(paramsCopy.dateFrom).format('DD%2FMM%2FYYYY')
	if (paramsCopy.dateTo) { paramsCopy.dateTo = moment(paramsCopy.dateTo).format('DD%2FMM%2FYYYY')}else{
		paramsCopy.dateTo = paramsCopy.dateFrom
	}

	Object.keys(paramsCopy).forEach(key => {if(paramsCopy[key] === null){delete paramsCopy[key]}})

	var query = Object.keys(paramsCopy).map(k => k + '=' + paramsCopy[k]).join('&')

	return dispatch => {
		dispatch(requestFlights())
		return fetch('https://api.skypicker.com/flights?v=2&locale=en&'+query)
		.then(
            response => response.json(),
			error => dispatch(responseFlightsErr())
		)
		.then(
			data => {return dispatch(responseFlightsSucc(data.data))}
		)
	}
}

export function fetchFlightsMulti(params){
	var paramsCopy = Object.assign({},params)
	paramsCopy.flyFrom = paramsCopy.flyFrom.map(from => from.id).join(',')
	paramsCopy.to = paramsCopy.to.map(from => from.id).join(',')
	return fetchFlights(paramsCopy)
}


