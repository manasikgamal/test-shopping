import React, { Component } from 'react'
import Headerprice from './Headerprice';

export default class Currency extends Component {
    render() {
        console.log(this.props.currn);
        return (
            <div className="currncontainer">
                 {this.props.currn.slice(0, 1).map((pro)=>(
                    <div key={pro.id} >
                       <Headerprice currnvisible={this.props.currnvisible} change={this.props.change} onclick={this.props.onclick} price={pro.prices}/>
                    </div>
                ))}
            </div>
        )
    }
}
