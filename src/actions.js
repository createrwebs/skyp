import moment from 'moment'

export const REQUEST_FLIGHTS = "REQUEST_FLIGHTS" 
export const RESPONSE_FLIGHTS_ERR = "RESPONSE_FLIGHTS_ERR"
export const RESPONSE_FLIGHTS_SUCC = "RESPONSE_FLIGHTS_SUCC"

export const REQUEST_PLACES = "REQUEST_PLACES"
export const RESPONSE_PLACES_SUCC = "REQUEST_PLACES_SUCC"
export const RESPONSE_PLACES_ERR = "REQUEST_PLACES_ERR"

export const MAIN_PAGE_SET_FROM = "MAIN_PAGE_SET_FROM"
export const MAIN_PAGE_SET_TO = "MAIN_PAGE_SET_TO"
export const MAIN_PAGE_SET_DATE = "MAIN_PAGE_SET_DATE"

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

export function mainPageSetFrom(from){
	return{
		type: MAIN_PAGE_SET_FROM,
		from
	}
}

export function mainPageSetTo(to){
	return{
		type: MAIN_PAGE_SET_TO,
		to
	}
}

export function mainPageSetDate(date){
	return{
		type: MAIN_PAGE_SET_DATE,
		date
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

export function fetchFlights(from,to,date){
	let dateString = moment(date).format('DD%2FMM%2FYYYY')
	return dispatch => {
		dispatch(requestFlights())
		return fetch('https://api.skypicker.com/flights?v=2&locale=en&flyFrom='+from+'&to='+to+'&dateFrom='+dateString+'&dateTo='+dateString)
		.then(
            response => response.json(),
			error => dispatch(responseFlightsErr())
		)
		.then(
			data => {return dispatch(responseFlightsSucc(data.data))}
		)
	}
}

/*
export function fetchFlightsMulti(from,to,date){
	let dateString = moment(date).format('DD%2FMM%2FYYYY')
	let allData = []
	from.forEach(fromPlace => 
		to.forEach(toPlace =>
			promises.push(fetch('https://api.skypicker.com/flights?v=2&locale=en&flyFrom='+fromPlace.id+'&to='+toPlace.id+'&dateFrom='+dateString+'&dateTo='+dateString).then(response => response.json()).then(jsonData => allData = allData.concat(jsonData.data)))
		)
	)
	return dispatch => {
		dispatch(requestFlights())
		return Promise.all(promises)
		.then(
			error => dispatch(responseFlightsErr())
		)
		.then(
			data => {return dispatch(responseFlightsSucc(allData))}
		)
	}

}*/


export function fetchFlightsMulti(from,to,date){
	from = from.map(from => from.id).join(',')
	to = to.map(from => from.id).join(',')
	return fetchFlights(from,to,date)
}


