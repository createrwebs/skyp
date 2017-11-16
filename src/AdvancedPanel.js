import React, { Component } from 'react';
import {mainPageSetState} from './actions'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker'
import moment from 'moment'
import FlatButton from 'material-ui/FlatButton';

export class AdvancedPanel extends Component {

	render(){
		return(
      <div style={{background: 'white', margin: '6px', padding: '6px', borderRadius: '6px', position: 'relative',  display: 'flex', flexDirection: 'row',justifyContent: 'center'}}>
        <div>
          <div><b>Return: </b></div>
          {(!this.props.returnFrom && !this.props.returnTo) && <div>(leave empty if one-way)</div>}
          {(this.props.returnFrom || this.props.returnTo) && <FlatButton onClick={this.handleReturnBtnClear} label="CLEAR"/>}
          <DatePicker 
            className="date-field"
            value={this.props.returnFrom} 
            onChange={this.handleDateChangeRet} 
            hintText="Return from" />
          <DatePicker
            className="date-field" 
            value={this.props.returnTo} 
            onChange={this.handleDateChangeRet} 
            hintText="Return to" />
        </div>
        <div>
          <div><b>Number of passengers :</b></div>
          <IconButton disabled={this.props.passengers < 2} onClick={this.decreasePassCounter}>
            <FontIcon className="fa fa-minus" />
          </IconButton>
          { this.props.passengers }
          <IconButton disabled={this.props.passengers > 9} onClick={this.increasePassCounter}>
            <FontIcon className="fa fa-plus" />
          </IconButton>
        </div>

        <div>
          <b>Only on days :</b>
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
        </div>
         <div>
           <b>Sort by :</b>
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
        <Toggle
            style = {{width: 'auto'}}
            toggled = {this.props.directFlights}
            onToggle = {this.handleOnlyDirectChange}
            label="Only direct flights"
         />   
      </div>
		);
	}

  /*handles change for the sorting selector
  @param event - event fired when clicked on the radio buttons
  @param value - value of the selected radio button
  */
  handleSortChange = (event,value) => {
    this.props.dispatch && this.props.dispatch(mainPageSetState({sort: value}));
  }

  //handles return button clear, clears both return dates 
  handleReturnBtnClear = () => {
    this.props.dispatch && this.props.dispatch(mainPageSetState({returnFrom: null, returnTo: null}));
  }

  /*handles date change for return fields
  @param value - date object
  @param formattedValue - string representing the date
  */
  handleDateChangeRet = (value,formattedValue) => {
    if(!this.props.returnFrom){
      this.props.dispatch && this.props.dispatch(mainPageSetState({returnFrom : moment(formattedValue).toDate()}));
    }
    if(!this.props.returnTo){
      this.props.dispatch && this.props.dispatch(mainPageSetState({returnTo : moment(formattedValue).toDate()}));  
    } 
  }
  
  /*handles change on the toggle for direct flights
  @param event - event fired when the toggle is changed
  @param value - value that the toggle is set to
  */
  handleOnlyDirectChange = (event,value) => {
    this.props.dispatch && this.props.dispatch(mainPageSetState({directFlights: value}));
  }

  //handles increase of the passanger counter when clicking the plus button
  increasePassCounter = ()=>{
    let i = this.props.passengers + 1
    this.props.dispatch && this.props.dispatch(mainPageSetState({passengers : i}));
  }

  //handles decrease of the passanger counter when clicking the plus minus
  decreasePassCounter = ()=>{
    let i = this.props.passengers - 1
    this.props.dispatch && this.props.dispatch(mainPageSetState({passengers : i}));
  }

  //gets value that the days filter should be set to
  getValueSelectedForOnlyOn = () => {
    if(!this.props.onlyWeekends && !this.props.onlyWorkingDays){
      return "any";
    }else if(this.props.onlyWeekends){
      return "weekends";
    }else if(this.props.onlyWorkingDays){
      return "workdays";
    }
  }

  /*handles selection on the days filter 
  @param event - event fired when radio button is clicked
  @param value - value of the selected radio button
  */
  handleSelectedForOnly = (event, value) => {
    if(value === 'any'){
      this.props.dispatch && this.props.dispatch(mainPageSetState({onlyWeekends: false, onlyWorkingDays: false}));
    }else if(value === 'weekends'){
      this.props.dispatch && this.props.dispatch(mainPageSetState({onlyWeekends: true, onlyWorkingDays: false}));
    }else if(value === 'workdays'){
      this.props.dispatch && this.props.dispatch(mainPageSetState({onlyWeekends: false, onlyWorkingDays: true}));
    }
  }

}

export default AdvancedPanel