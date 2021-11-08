import React, { Component } from 'react'
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { Markup } from 'interweave';
import { Link } from 'react-router-dom';
import Gallary from './Gallary';
import Size from './Size'
import Price from './Price';
class Description extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
    }
    render() {
       // console.log(this.props.description);
        const {match} = this.props;
        const root =match.params.id;
       // const num=parseInt(root)
        return (
              <div className="desc">
                  {this.props.description.filter(product => product.id === root).map(filteredPerson => (
    <ul key={filteredPerson.id}>
        <Gallary images={filteredPerson.gallery} isVisible={this.props.isVisible}/>
        <div className="real">
        <li className="base">{filteredPerson.name}</li>
        <div className="one">{filteredPerson.brand}</div>
      <li><h3 className="size" ><Size chandedesable={this.props.chandedesable} proid={filteredPerson.id} size={filteredPerson.attributes} onattributclick={this.props.onattributclick}/></h3></li>
        <div className="price">
        <h3>PRICE:</h3>
        <li><h2><Price currn={this.props.currn} price={filteredPerson.prices}/></h2></li>
        </div>
        <Link to='/cart'>
        <button className="descbtn" disabled={this.props.disable} onClick={()=>{this.props.addtocart(filteredPerson);
        this.props.addicon(filteredPerson);localStorage.removeItem("items")}}>ADD TO CART</button>
        </Link >
        <div className="text">
        <li><Markup content={filteredPerson.description} /></li>
        </div>
        </div>
    </ul>
    
  ))}
              </div>
        
            
        )
    }
    
}
export default withRouter(Description);
