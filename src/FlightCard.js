import React, { Component } from 'react';
import moment from 'moment'
import {Card, CardHeader} from 'material-ui/Card';

export class FlightCard extends Component {

  render() {
    if(this.props.flight){
      let routes = this.parseRoutes(this.props.flight.routes,this.props.flight.route);
      return (
        <div className="FlightCard"> 
        <Card>
          <CardHeader style={{padding: '0'}}actAsExpander={true} showExpandableButton={true}>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              <div style={{width: '20%', display: 'flex', flexDirection: 'row'}}>
              <div style={{padding: '12px', fontSize: 'xx-large' , marginLeft: '26px' }}>
                {this.props.flight.price} {this.props.currency}
              </div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexWrap: 'wrap', flex: '1'}}>
                {routes[0] && routes[0].length > 0 && 
                  <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>from <span className="tag-like">{routes[0][0].cityFrom} </span> 
                  to <span className="tag-like">{routes[0][routes[0].length-1].cityTo}</span> 
                  with <b>&nbsp;{routes[0].length - 1 } layovers &nbsp;</b> 
                  and <b>&nbsp;total time {this.props.flight.fly_duration} &nbsp;</b>
              </div>}
                {routes[1] && routes[1].length > 0 && 
                  <div>&nbsp;and back with<b> {routes[1].length - 1} layovers &nbsp;</b> 
                  and <b> &nbsp;total time {this.props.flight.return_duration} &nbsp;</b>
                  </div>}
              </div>
            </div>
          </CardHeader>
          <div expandable={true}  
            style={{padding: '12px', width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
            <div className="flight-card-info" style={{textAlign: 'left', display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
              <div><b>Departure:</b> {moment.unix(parseInt(this.props.flight.dTime,10)).format('DD/MM HH:mm')}</div>
              <div><b>Arrival:</b> {moment.unix(parseInt(this.props.flight.aTime,10)).format('DD/MM HH:mm')}</div>
              <div><b>Distance:</b> {this.props.flight.distance} km</div>
            </div>
            {this.props.flight.airlines && 
              this.props.flight.airlines.map(airline => 
              <div style={{marginLeft:'6px'}}>
                <img src={"https://images.kiwi.com/airlines/64/"+airline+".png"} alt={airline}  title={airline}/>
              </div>)}
            <div style={{marginRight: 'auto'}}></div>
            <div style={{width: '80%', display: 'flex', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap'}}>
                {routes.map(route => <div style={{marginTop: '6px', display: 'flex', flexDirection: 'row' , flexWrap: 'wrap'}}>{this.renderRoute(route)}</div>)}                
            </div>
          </div>
        </Card>
        </div>
      );
    }else{
      return null;
    }            
  }

  renderRoute = (route) => {
    return route.map((rt,index) => {
      if(route.length - 1 === index){
        return this.renderLastRouteNode(rt);
      }else{
        return this.renderNotLastRouteNode(rt);
      }
    })
  }

  renderRouteContainer = (mapId,time) =>{
    return(
      <div style={{background: 'gainsboro', borderRadius: '6px', padding: '6px'}}>                   
        <div>
          <div>{mapId}</div>
          <div>{moment.unix(parseInt(time,10)).format('DD/MM HH:mm')}</div>
        </div>
      </div>
    )
  }

  parseRoutes = (routes, notpRoutes) => {
    let parsedRoutes = [];
    let finalRoute = [];
    let i=0;
    notpRoutes.forEach(notpRoute => {
      finalRoute.push(notpRoute);
      if(routes[i] && routes[i][1] === notpRoute.flyTo){
        parsedRoutes.push([...finalRoute]);
        finalRoute = [];
        i++;
      }
    });
    return parsedRoutes;
  }

  renderArrow = () =>{ 
    return(
      <div style={{display: 'flex', alignItems: 'center', margin: '0 16px'}}><i className="fa fa-arrow-right" aria-hidden="true"></i>
      </div>
    );
  }

  renderNotLastRouteNode = (route) => {
    return (<div style={{display: 'flex', flexDirection: 'row'}}>
      {this.renderRouteContainer(route.mapIdfrom,route.dTime)}
      {this.renderArrow()}
    </div>);
  }

  renderLastRouteNode = (route) => {
    return <div style={{display: 'flex', flexDirection: 'row'}}>
      {this.renderRouteContainer(route.mapIdfrom,route.dTime)}
      {this.renderArrow()}
      {this.renderRouteContainer(route.mapIdto,route.aTime)}
    </div>;
  }
}

export default FlightCard;
