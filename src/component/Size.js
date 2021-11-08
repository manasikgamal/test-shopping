import React, { Component } from 'react'
import Items from './Items';

export default class Size extends Component {
    render() {
        return (
            <div >
                {this.props.size.map((pro,index)=>(
                    <div key={index}>
                    <p>{pro.id}</p>
                     <p><Items chandedesable={this.props.chandedesable} type={pro.type} size={this.props.size} proid={this.props.proid} id={pro.id} onattributclick={this.props.onattributclick} items={pro.items}/></p>
                    </div>        
                ))}
                
            </div>
        )
    }
}
