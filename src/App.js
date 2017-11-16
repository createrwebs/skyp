import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import 'react-tag-input/example/reactTags.css'
import {fetchFlightsMulti, responseFlightsSucc} from './actions'
import LinearProgress from 'material-ui/LinearProgress';
import FlightCard from './FlightCard'
import MainPanel from './MainPanel'

export class App extends Component {

  render() {
    return (
        <div className="App">
          <div className={(this.props.isFetching ? "block-mouse" : "")}>
          <MainPanel className="main-panel-wrapper" {...this.props.mainPage} dispatch={this.props.dispatch} places={this.props.places} />
          </div>
          {this.props.isFetching && <LinearProgress color= "#FF5722" className="progress-bar-wrapper" mode="indeterminate" /> }
          <div className="search-panel" style={{padding: '6px'}}>
            {
              this.props.flights && this.props.flights.length !== 0 &&
              <div className={"flight-list-wrapper"+(this.props.isFetching ? " fade" : "")}>
                {
                  this.props.flights.map(
                  flight => <FlightCard currency={this.props.currency} flight={flight}/>
                  )
                }
              </div>
            }
            {
              this.props.flights && this.props.flights.length === 0 && !this.props.isFetching &&
              <div className="not-found-wrapper" style={{opacity: '0.2'}}>
                <h2>Nothing found try different parameters</h2>
                <h4>("from" "to" and "date" are required)</h4>
              </div>
            }     
          </div>
      </div>
    );
  }

  //loads flights if UI state of main page changes
  componentWillReceiveProps(nextProps) {
      if(nextProps.mainPage !== this.props.mainPage && nextProps.mainPage.flyFrom.length && nextProps.mainPage.to.length && nextProps.mainPage.dateFrom) {
        this.props.dispatch && this.props.dispatch(fetchFlightsMulti(nextProps.mainPage));
      }else if(
        (!nextProps.mainPage.flyFrom.length && this.props.mainPage.flyFrom.length) ||
        (!nextProps.mainPage.to.length && this.props.mainPage.to.length) ||
        (!nextProps.mainPage.dateFrom && this.props.mainPage.dateFrom)
      )
      {
        this.props.dispatch && this.props.dispatch(responseFlightsSucc([]));
      }
  }
}

//maps redux state to this components props
function mapStateToProps(state,props){
  return{
    places: state.places.places,
    flights: state.flights.flights,
    currency: state.flights.currency,
    mainPage: state.mainPage,
    isFetching: state.flights.isFetching
  }
}

export default connect(mapStateToProps)(App);
