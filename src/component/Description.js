import React, { Component } from 'react'
import { withRouter,Prompt } from "react-router";
import PropTypes from "prop-types";
import { Markup } from 'interweave';
import { Link } from 'react-router-dom';
import Gallary from './Gallary';
import Size from './Size'
import Price from './Price';
class Description extends Component {
    constructor() {
        super();
        this.state = {
            disable:true,
            isBack: false
        }}
    static propTypes = {
        match: PropTypes.object.isRequired,
    }
    fullitems=(size,proid)=>{
        let n=0
        const y=size.length
        const x=localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')):[]
       x.forEach(item=>{
           if(item.proid===proid)
         if(item.ctr===1){
         n++
         }
       })
        if(y===n){
        this.setState({disable:false})
        }
        }
    render() {
        const {match} = this.props;
        const root =match.params.id;
      const g=this.props.description.filter(product => product.id === root).map(p => (p.attributes.length))
      if(g[0]===0){
          if(this.state.disable)
        this.setState({disable:false})
       }
       
        return (
  
              <div className="desc">
                  
                  {this.props.description.filter(product => product.id === root).map(filteredPerson => (
    <ul key={filteredPerson.id}>
        <Gallary images={filteredPerson.gallery} isVisible={this.props.isVisible}/>
        <div className="real">
        <li className="base">{filteredPerson.name}</li>
        <div className="one">{filteredPerson.brand}</div>
      <li><h3 className="size" ><Size fullitems={this.fullitems} tocart={this.props.tocart} proid={filteredPerson.id} size={filteredPerson.attributes} onattributclick={this.props.onattributclick}/></h3></li>
        <div className="price">
        <h3>PRICE:</h3>
        <li><h2><Price currn={this.props.currn} price={filteredPerson.prices}/></h2></li>
        </div>
        <Link to='/cart'>
        <button className="descbtn" disabled={this.state.disable} onClick={()=>{this.props.addtocart(filteredPerson);
        this.props.addicon(filteredPerson);localStorage.removeItem("items");}}  style={{background:this.state.disable?"darkgrey":"rgb(62, 231, 113)"}} >ADD TO CART</button>
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
