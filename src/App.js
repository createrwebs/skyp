import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { WithContext as ReactTags } from 'react-tag-input';
import { connect } from 'react-redux'
import 'react-tag-input/example/reactTags.css'
import DatePicker from 'material-ui/DatePicker'
import {mainPageSetFrom, mainPageSetTo, mainPageSetDate, fetchPlacesForSuggestions, fetchFlightsMulti } from './actions'
import LinearProgress from 'material-ui/LinearProgress';
import moment from 'moment'
import FlightCard from './FlightCard'

class App extends Component {
  render() {
    return (
        <div className="App">
          <div style={{position: 'relative', background: '#00bcd4',padding: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'center'}} className ="main-panel material-shadow">
            <div className="main-panel-from">From: <ReactTags autocomplete={true} handleDelete={this.handleDeleteFrom} handleInputChange={this.handleInputChange} tags={this.props.from} suggestions = {this.props.places.map(place=>place.value)} handleAddition={this.handleAdditionFrom} /></div>
            <div className="main-panel-to">To: <ReactTags autocomplete={true} handleDelete={this.handleDeleteTo} handleInputChange={this.handleInputChange} suggestions = {this.props.places.map(place=>place.value)} tags={this.props.to} handleAddition={this.handleAdditionTo} /></div>
            <div className="main-panel-date">Date:  <DatePicker value={this.props.date} onChange={this.handleDateChange} hintText="Portrait Dialog" /></div>
          </div>
          <div className="search-panel" style={{padding: '6px'}}>
            {this.props.isFetching &&
              <LinearProgress mode="indeterminate" />
            }
            {
              this.props.flights &&
              this.props.flights.map(
                flight => <FlightCard currency={this.props.currency} flight={flight}/>
              )
            }     
          </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.from !== this.props.from || nextProps.to !== this.props.to || nextProps.date !== this.props.date ) && 
      (nextProps.from.length && nextProps.to.length && nextProps.date)) {
      this.props.dispatch && this.props.dispatch(fetchFlightsMulti(nextProps.from, nextProps.to, nextProps.date))
    }
  }

  handleDateChange = (value,formattedValue) => {
    this.props.dispatch && this.props.dispatch(mainPageSetDate(moment(formattedValue).toDate()))
  }

  handleAdditionFrom = (tag) => {
    if(!this.props.places.length){return /*todo show that it is not valid*/}
    let matchPlace = this.props.places.filter(place => place.value === tag)[0]
    let tagToAdd = {id: matchPlace.id, text: tag}    
    let tags = [...this.props.from]
    tags.push(tagToAdd)
    this.props.dispatch && this.props.dispatch(mainPageSetFrom(tags))
  }

  handleAdditionTo = (tag) => {
    if(!this.props.places.length){return /*todo show that it is not valid*/}
    let matchPlace = this.props.places.filter(place => place.value === tag)[0]
    let tagToAdd = {id: matchPlace.id, text: tag}
    let tags = [...this.props.to]
    tags.push(tagToAdd)
    this.props.dispatch && this.props.dispatch(mainPageSetTo(tags))
  }

  handleInputChange = (input) => {
    input.length > 2 && this.props.dispatch && this.props.dispatch(fetchPlacesForSuggestions(input))
  }

  handleDeleteFrom = (i) => {
    let tags = [...this.props.from]
    tags.splice(i,1)
    this.props.dispatch && this.props.dispatch(mainPageSetFrom(tags))
  }

  handleDeleteTo = (i) => {
    let tags = [...this.props.to]
    tags.splice(i,1)
    this.props.dispatch && this.props.dispatch(mainPageSetTo(tags))
  } 
}


function mapStateToProps(state,props){
  return{
    from: state.mainPage.from,
    to: state.mainPage.to,
    date: state.mainPage.date,
    places: state.places.places,
    flights: state.flights.flights,
    isFetching: state.flights.isFetching,
    currency: state.flights.currency
  }
}


export default connect(mapStateToProps)(App);
