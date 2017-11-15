import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { WithContext as ReactTags } from 'react-tag-input';
import { connect } from 'react-redux'
import 'react-tag-input/example/reactTags.css'
import DatePicker from 'material-ui/DatePicker'
import {mainPageSetState, fetchPlacesForSuggestions, fetchFlightsMulti } from './actions'
import LinearProgress from 'material-ui/LinearProgress';
import moment from 'moment'
import FlightCard from './FlightCard'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { advanced: false };
  }

  render() {
    return (
        <div className="App">
          <div style={{background: '#00bcd4'}} className="material-shadow">
            <div style={{position: 'relative',padding: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'center'}} className ="main-panel">
              <div className="main-panel-from"><div style={{color: 'white'}}>From:</div><ReactTags handleFilterSuggestions={this.filterSuggestions} autocomplete={true} handleDelete={this.handleDeleteFrom} handleInputChange={this.handleInputChange} tags={this.props.from} suggestions = {this.props.places.map(place=>place.value)} handleAddition={this.handleAdditionFrom} /></div>
              <div className="main-panel-to"><div style={{color: 'white'}}>To:</div><ReactTags handleFilterSuggestions={this.filterSuggestions} autocomplete={true} handleDelete={this.handleDeleteTo} handleInputChange={this.handleInputChange} suggestions = {this.props.places.map(place=>place.value)} tags={this.props.to} handleAddition={this.handleAdditionTo} /></div>
              
              <div className="main-panel-date"><div style={{color: 'white'}}>Date from:</div><DatePicker value={this.props.dateFrom} onChange={this.handleDateChange} hintText="Portrait Dialog" /></div>
              { this.state.advanced && <div className="main-panel-date"><div style={{color: 'white'}}>Date to:</div><DatePicker value={this.props.dateTo} onChange={this.handleDateChangeTo} hintText="Portrait Dialog" /></div>
              }
            </div>
            {this.state.advanced && <div style={{background: 'white', margin: '6px', padding: '6px', borderRadius: '6px', position: 'relative',  display: 'flex', flexDirection: 'row',justifyContent: 'center'}}>
              <Divider />
              <div>
              <div>Number of passengers:</div>
              <IconButton disabled={this.props.passengers < 2} onClick={this.decreasePassConuter} tooltip="Font Icon">
                <FontIcon className="fa fa-minus" />
              </IconButton>
              { this.props.passengers }
              <IconButton disabled={this.props.passengers > 9} onClick={this.increasePassConuter} tooltip="Font Icon">
                <FontIcon className="fa fa-plus" />
              </IconButton>
              </div>

              <RadioButtonGroup name="onlyDays" valueSelected={this.getValueSelectedForOnlyOn()} onChange={this.handleSelectedForOnly}>
                <RadioButton
                  value="any"
                  label="Any day"
                />
                <RadioButton
                  value="weekends"
                  label="Only weekends"
                />
                <RadioButton
                  value="workdays"
                  label="Only workdays"
                />
              </RadioButtonGroup>

               <Toggle
                  style = {{width: 'auto'}}
                  toggled = {this.props.directFlights}
                  onToggle = {this.handleOnlyDirectChange}
                  label="Only direct flights"
               />

               Sort by:
               <RadioButtonGroup name="sortBy" valueSelected={this.props.sort} onChange={this.handleSortChange}>
                <RadioButton
                  value="price"
                  label="Price"
                />
                <RadioButton
                  value="quality"
                  label="Quality"
                />
                <RadioButton
                  value="date"
                  label="Date"
                />
                <RadioButton
                  value="duration"
                  label="Duration"
                />
              </RadioButtonGroup>
            
            </div>
            }
          <FlatButton style={{color: 'white'}} label={this.state.advanced ? "HIDE" : "MORE OPTIONS"} onClick={this.toggleAdvanced} />
          </div>
          {this.props.isFetching &&
            <LinearProgress mode="indeterminate" />
          }
          <div className="search-panel" style={{padding: '6px'}}>
            {
              this.props.flights &&
              this.props.flights.map(
                flight => <FlightCard currency={this.props.currency} flight={flight}/>
              )
            }
            {
              !this.props.flights.length && !this.props.isFetching &&
              <h2 style={{opacity: '0.2'}}>Nothing found try different parameters</h2>
            }     
          </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.mainPage !== this.props.mainPage && nextProps.from.length && nextProps.to.length && nextProps.dateFrom) {
      this.props.dispatch && this.props.dispatch(fetchFlightsMulti(nextProps.mainPage))
    }
  }

  toggleAdvanced = () => {
    this.setState({advanced: !this.state.advanced})
  }

  handleDateChange = (value,formattedValue) => {
    this.props.dispatch && this.props.dispatch(mainPageSetState({dateFrom : moment(formattedValue).toDate()}))
  }

  handleDateChangeTo = (value,formattedValue) => {
    this.props.dispatch && this.props.dispatch(mainPageSetState({dateTo : moment(formattedValue).toDate()}))
  }

  handleAdditionFrom = (tag) => {
    if(!this.props.places.length){return /*todo show that it is not valid*/}
    let matchPlace = this.props.places.filter(place => place.value === tag)[0]
    let tagToAdd = {id: matchPlace.id, text: tag}    
    let tags = [...this.props.from]
    tags.push(tagToAdd)
    this.props.dispatch && this.props.dispatch(mainPageSetState({flyFrom: tags}))
  }

  handleAdditionTo = (tag) => {
    if(!this.props.places.length){return /*todo show that it is not valid*/}
    let matchPlace = this.props.places.filter(place => place.value === tag)[0]
    let tagToAdd = {id: matchPlace.id, text: tag}
    let tags = [...this.props.to]
    tags.push(tagToAdd)
    this.props.dispatch && this.props.dispatch(mainPageSetState({to: tags}))
  }

  handleInputChange = (input) => {
    input.length > 2 && this.props.dispatch && this.props.dispatch(fetchPlacesForSuggestions(input))
  }

  handleDeleteFrom = (i) => {
    let tags = [...this.props.from]
    tags.splice(i,1)
    this.props.dispatch && this.props.dispatch(mainPageSetState({flyFrom: tags}))
  }

  handleDeleteTo = (i) => {
    let tags = [...this.props.to]
    tags.splice(i,1)
    this.props.dispatch && this.props.dispatch(mainPageSetState({to: tags}))
  } 

  filterSuggestions = (textInputValue,possibleSuggestionsArray) => {
      return possibleSuggestionsArray.slice(0,10).filter(item =>
        item.toLowerCase().indexOf(textInputValue.toLowerCase()) === 0
      )
  }

  handleSortChange = (event,value) => {
    this.props.dispatch && this.props.dispatch(mainPageSetState({sort: value}))
  }

  handleOnlyDirectChange = (event,value) => {
    this.props.dispatch && this.props.dispatch(mainPageSetState({directFlights: value}))
  }

  increasePassConuter = ()=>{
    let i = this.props.passengers + 1
    this.props.dispatch && this.props.dispatch(mainPageSetState({passengers : i}))
  }

  decreasePassConuter = ()=>{
    let i = this.props.passengers - 1
    this.props.dispatch && this.props.dispatch(mainPageSetState({passengers : i}))
  }

  getValueSelectedForOnlyOn = () => {
    if(!this.props.onlyWeekends && !this.props.onlyWorkingDays){
      return "any"
    }else if(this.props.onlyWeekends){
      return "weekends"
    }else if(this.props.onlyWorkingDays){
      return "workdays"
    }
  }

  handleSelectedForOnly = (event, value) => {
    if(value === 'any'){
      this.props.dispatch && this.props.dispatch(mainPageSetState({onlyWeekends: false, onlyWorkingDays: false}))
    }else if(value === 'weekends'){
      this.props.dispatch && this.props.dispatch(mainPageSetState({onlyWeekends: true, onlyWorkingDays: false}))
    }else if(value === 'workdays'){
      this.props.dispatch && this.props.dispatch(mainPageSetState({onlyWeekends: false, onlyWorkingDays: true}))
    }
  }
}


function mapStateToProps(state,props){
  return{
    from: state.mainPage.flyFrom,
    to: state.mainPage.to,
    dateFrom: state.mainPage.dateFrom,
    dateTo: state.mainPage.dateTo,
    places: state.places.places,
    flights: state.flights.flights,
    passengers: state.mainPage.passengers,
    sort: state.mainPage.sort,
    onlyOn: state.mainPage.excludeDays,
    directFlights: state.mainPage.directFlights,
    isFetching: state.flights.isFetching,
    currency: state.flights.currency,
    mainPage: state.mainPage,
    onlyWeekends: state.mainPage.onlyWeekends,
    onlyWorkingDays: state.mainPage.onlyWorkingDays
  }
}


export default connect(mapStateToProps)(App);
