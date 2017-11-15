import React, { Component } from 'react';
import moment from 'moment'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class FlightCard extends Component {
  render() {
    return (
        this.props.flight &&
        <Card>
          <CardHeader style={{padding: '0'}}actAsExpander={true} showExpandableButton={true}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{width: '20%', display: 'flex', flexDirection: 'row'}}>
            <div style={{padding: '12px', fontSize: 'xx-large' , marginLeft: '26px' }}>{this.props.flight.price} {this.props.currency}</div>
            </div>
            <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div>from {this.props.flight.cityFrom} to {this.props.flight.cityTo} with <b>{this.props.flight.route.length - 1} layovers</b> and <b>total time {this.props.flight.fly_duration}</b></div>
            </div>
          </div>
          </CardHeader>
            <div  expandable={true}  style={{paddingBottom: '12px', width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <div className="flight-card-info" style={{textAlign: 'left', display: 'flex', flexDirection: 'column'}}>
                <div><b>Departure:</b> {moment.unix(parseInt(this.props.flight.dTime)).format('DD/MM hh:mm')}</div>
                <div><b>Arrival:</b> {moment.unix(parseInt(this.props.flight.aTime)).format('DD/MM hh:mm')}</div>
                <div><b>Distance:</b> {this.props.flight.distance} km</div>
              </div>
              <div style={{width: '80%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                {this.props.flight.route.map(route => 
                <div style={{marginLeft: '16px', display: 'flex', flexDirection: 'row'}}><div style={{background: 'gainsboro', borderRadius: '6px', padding: '6px'}}><div>{route.mapIdfrom}</div><div>{moment.unix(parseInt(route.dTime)).format('DD/MM hh:mm')}</div></div><div style={{display: 'flex', alignItems: 'center', margin: '0 16px'}}><i class="fa fa-arrow-right" aria-hidden="true"></i></div></div>
                )}
                <div style={{display: 'flex', flexDirection: 'row'}}><div style={{background: 'gainsboro', borderRadius: '6px', padding: '6px'}}><div>{this.props.flight.mapIdto}</div><div>{moment.unix(parseInt(this.props.flight.aTime)).format('DD/MM hh:mm')}</div></div></div>
              </div>
          </div>
        </Card>
      
    )
  }
}

export default FlightCard;
