import React, { Component } from 'react';
import moment from 'moment'
import {Card, CardHeader} from 'material-ui/Card';

class FlightCard extends Component {
  render() {
    let routes = this.parseRoutes(this.props.flight.routes,this.props.flight.route)
    return (
        this.props.flight &&
        <Card>
          <CardHeader style={{padding: '0'}}actAsExpander={true} showExpandableButton={true}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{width: '20%', display: 'flex', flexDirection: 'row'}}>
            <div style={{padding: '12px', fontSize: 'xx-large' , marginLeft: '26px' }}>{this.props.flight.price} {this.props.currency}</div>
            </div>
            <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
              <div>from <span className="tag-like">{routes[0][0].cityFrom} </span> to <span className="tag-like">{routes[0][routes[0].length-1].cityTo}</span> with <b>{routes[0].length - 1} layovers</b> and <b>total time {this.props.flight.fly_duration}</b></div>
              {routes[1] && routes[1].length > 0 && <div> and back with<b> {routes[1].length - 1} layovers</b> and <b>total time {this.props.flight.return_duration}</b></div>}
            </div>
          </div>
          </CardHeader>
            <div  expandable={true}  style={{paddingBottom: '12px', width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <div className="flight-card-info" style={{textAlign: 'left', display: 'flex', flexDirection: 'column'}}>
                <div><b>Departure:</b> {moment.unix(parseInt(this.props.flight.dTime,10)).format('DD/MM hh:mm')}</div>
                <div><b>Arrival:</b> {moment.unix(parseInt(this.props.flight.aTime,10)).format('DD/MM hh:mm')}</div>
                <div><b>Distance:</b> {this.props.flight.distance} km</div>
              </div>
              <div style={{width: '80%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              {routes.map(route => <div style={{marginTop: '6px', display: 'flex', flexDirection: 'row'}}>{this.renderRoute(route)}</div>)}                
              </div>
          </div>
        </Card>
      )
  }

  renderRoute = (route) => {
    return route.map((rt,index) => {
      if(route.length - 1 === index){
        return this.getLastRouteNode(rt)
      }else{
        return this.getNotLastRouteNode(rt)
      }
    })
  }

  getRouteContainer = (mapId,time) =>{
    return(
      <div style={{background: 'gainsboro', borderRadius: '6px', padding: '6px'}}>                   
        <div>
          <div>{mapId}</div>
          <div>{moment.unix(parseInt(time,10)).format('DD/MM hh:mm')}</div>
        </div>
      </div>
    )
  }

  parseRoutes = (routes, notpRoutes) => {
    let parsedRoutes = [];
    let finalRoute = [];
    let i=0
    notpRoutes.forEach(notpRoute => {
      finalRoute.push(notpRoute);
      if(routes[i][1] === notpRoute.flyTo){
        parsedRoutes.push([...finalRoute]);
        finalRoute = [];
        i++
      }
    })
    return parsedRoutes;
  }

  getArrow = () =>{ 
    return(
      <div style={{display: 'flex', alignItems: 'center', margin: '0 16px'}}><i className="fa fa-arrow-right" aria-hidden="true"></i>
      </div>
    )
  }

  getNotLastRouteNode = (route) => {
      return (<div style={{display: 'flex', flexDirection: 'row'}}>{this.getRouteContainer(route.mapIdfrom,route.dTime)}{this.getArrow()}</div>);
  }

  getLastRouteNode = (route) => {
      return <div style={{display: 'flex', flexDirection: 'row'}}>{this.getRouteContainer(route.mapIdfrom,route.dTime)}{this.getArrow()}{this.getRouteContainer(route.mapIdto,route.aTime)}</div>;
  }
}

export default FlightCard;
