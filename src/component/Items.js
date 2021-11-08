import React, { Component } from 'react'
export default class Items extends Component {
    render() {
        return (
            <div className="sizeshow">
                 {this.props.items.map((pro,index)=>(
                    <ul key={index}>
                     <li><button style={{backgroundColor:this.props.type==="swatch"?pro.value:"",color:this.props.type==="swatch"?pro.value:"",border:this.props.type==="swatch"?"1px solid black":""}} 
                     value={pro.value} 
                     onClick={(e)=>{this.props.onattributclick(pro.value,this.props.id,this.props.proid,this.props.size);this.props.chandedesable(false)}}>{pro.value}</button></li>
                    </ul>
                ))}
              
            </div>
        )
    }
}
