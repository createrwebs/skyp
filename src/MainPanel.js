import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker'
import {mainPageSetState, fetchPlacesForSuggestions } from './actions'
import moment from 'moment'
import FlatButton from 'material-ui/FlatButton';
import { WithContext as ReactTags } from 'react-tag-input';
import AdvancedPanel from './AdvancedPanel'

export class MainPanel extends Component {

  constructor(props) {
      super(props);
      this.state = { advanced: true };
    }

  render(){
    return(
      <div style={{background: '#00bcd4'}} className="MainPanel material-shadow">
        <div style={{position: 'relative',padding: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'}} 
          className ="main-panel">
          <div className="from-field-wrapper">
            <div style={{color: 'white'}}><b>From:</b></div>
            <ReactTags 
              handleFilterSuggestions={this.filterSuggestions} 
              autocomplete={true} 
              handleDelete={this.handleDeleteFrom} 
              handleInputChange={this.handleInputChange} 
              placeholder="Type first 3 letters of city or country"
              tags={this.props.flyFrom} 
              suggestions = {this.props.places.map(place=>place.value)} 
              handleAddition={this.handleAdditionFrom} />
          </div>
          <div className="to-field-wrapper">
            <div style={{color: 'white'}}><b>To:</b></div>
            <ReactTags 
              handleFilterSuggestions={this.filterSuggestions} 
              autocomplete={true} handleDelete={this.handleDeleteTo} 
              handleInputChange={this.handleInputChange} 
              placeholder="Type first 3 letters of city or country"
              suggestions = {this.props.places.map(place=>place.value)} 
              tags={this.props.to} 
              handleAddition={this.handleAdditionTo} />
          </div>
          <div className="date-field date-field-white date-from-field-wrapper">
            <div style={{color: 'white'}}><b>Date from:</b></div>
            <DatePicker 
              value={this.props.dateFrom} 
              onChange={this.handleDateChangeFrom} 
              hintText="Date to search from" />
          </div>
          { this.state.advanced && 
          <div className="date-field date-field-white date-to-field-wrapper">
            <div style={{color: 'white'}}><b>Date to:</b></div>
            <DatePicker 
              value={this.props.dateTo} 
              onChange={this.handleDateChangeTo} 
              hintText="Date to search to" />
          </div>
          }
        </div>
        {this.state.advanced &&
        <AdvancedPanel 
          className="advanced-panel-wrapper" {...this.props} />
        }
        {this.state.advanced && 
        <FlatButton 
          className="close-adv-panel-btn"
          style={{color: 'white'}} 
          label="HIDE ADVANCED OPTIONS" 
          onClick={this.toggleAdvanced} />
        }
        {!this.state.advanced && 
        <FlatButton 
          className="show-adv-panel-btn" 
          style={{color: 'white'}} 
          label="MORE OPTIONS" 
          onClick={this.toggleAdvanced} />
        }
      </div>
    )
  }

  //Using arrow functions almost everywhere to not loose refference
  //to 'this' when passed into some other context

  //toggles advanced state on or off
  toggleAdvanced = () => {
    this.setState({advanced: !this.state.advanced});
  }

  /*handles date change for date fields
  @param value - date object
  @param formattedValue - string representing the date
  */
  handleDateChangeFrom = (value,formattedValue) => {
    this.props.dispatch && this.props.dispatch(mainPageSetState({dateFrom : moment(formattedValue).toDate()}));
    if(!this.props.dateTo){
      this.props.dispatch && this.props.dispatch(mainPageSetState({dateTo : moment(formattedValue).toDate()}));
    }
  }

  /*handles date change for date fields
  @param value - date object
  @param formattedValue - string representing the date
  */
  handleDateChangeTo = (value,formattedValue) => {
    this.props.dispatch && this.props.dispatch(mainPageSetState({dateTo : moment(formattedValue).toDate()}));
    if(!this.props.dateFrom){
      this.props.dispatch && this.props.dispatch(mainPageSetState({dateFrom : moment(formattedValue).toDate()}));
    }
  }

  /*handles adding of the tags for ReactTags component on from field
  @param tag - string set into the tag field
  */
  handleAdditionFrom = (tag) => {
    this.handleAddition(tag,"flyFrom");
  }

  /*handles adding of the tags for ReactTags component on to field
  @param tag - string set into the tag field
  */
  handleAdditionTo = (tag) => {
    this.handleAddition(tag,"to");
  }

  //function for common addition code
  handleAddition = (tag, fieldName)=>{
    if(!this.props.places.length){return;}
    let matchPlace = this.props.places.filter(place => place.value === tag)[0];
    let tagToAdd = {id: matchPlace.id, text: tag};  
    let tags = [...this.props[fieldName]];
    tags.push(tagToAdd);
    let state = {};
    state[fieldName] = tags;
    this.props.dispatch && this.props.dispatch(mainPageSetState(state));
  }

  /*handles deletion of the tag from the from field
  @param i - intiger representing poisiton of the tag
  */
  handleDeleteFrom = (i) => {
    let tags = [...this.props.flyFrom];
    tags.splice(i,1);
    this.props.dispatch && this.props.dispatch(mainPageSetState({flyFrom: tags}));
  }
  
  /*handles deletion of the tag from the to field
  @param i - integer representing poisiton of the tag
  */
  handleDeleteTo = (i) => {
    let tags = [...this.props.to];
    tags.splice(i,1);
    this.props.dispatch && this.props.dispatch(mainPageSetState({to: tags}));
  } 

  /*handles input change on the from and to field, doesnt do anything if input is shorter than 2
  @param input - string representing the input
  */
  handleInputChange = (input) => {
    input.length > 2 && this.props.dispatch && this.props.dispatch(fetchPlacesForSuggestions(input));
  }

  /*filters suggestions for the ReactTag components, limits output to 10 
  @param textInputValue - input value that the suggestions are filtered by
  @param possibleSuggestionsArray - array of possible suggestions that should be displayed
  */
  filterSuggestions = (textInputValue,possibleSuggestionsArray) => {
    return possibleSuggestionsArray.slice(0,10).filter(item =>
      item.toLowerCase().indexOf(textInputValue.toLowerCase()) === 0
    );
  }
}

export default MainPanel