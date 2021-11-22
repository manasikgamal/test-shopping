import React, { Component } from 'react'
export default class Items extends Component {
    constructor() {
        super();
        this.state = {
            choose:-1,
            x:true
        }}
        bgcolor=(sizearray,size,value,items,key)=>{
            sizearray.forEach(element => {
                if(element.id===size){
                    items.forEach(item=>{
                        if(item.value===value){
                        this.setState({choose:key})
                        }  })} });}
    defaultvalue=(sizearray,size,items,proid)=>{
        const x=sizearray
       x.forEach(element=>{
           if(element.proid===proid)
        if(element.id===size){
            items.forEach(item=>{
        if(item.value===element.choose){
         if(this.state.choose)
        this.setState({choose:element.key})
    }})
    }})
}   
//chandex=()=>{
    //this.setState({x:false})
//}
    render() {
       // if(this.state.x===true){
            //this.defaultvalue(this.props.size,this.props.id,this.props.items,this.props.proid)
           // this.props.fullitems(this.props.size)
           // this.setState({x:false})
        //}
        return (
            <div className="sizeshow">
                 {this.props.items.map((pro,index)=>(
                    <ul >
                     <li> <button key={index} style={{backgroundColor:this.props.type==="swatch"?pro.value:"",
                     color:this.props.type==="swatch"?pro.value:"",
                     border:index===this.state.choose?"red solid":""
                     }} 
                     value={pro.value} 
                     onClick={(event)=>{this.props.onattributclick(pro.value,this.props.id,this.props.proid,this.props.size,index);
                     this.bgcolor(this.props.size,this.props.id,pro.value,this.props.items,index);
                     this.props.fullitems(this.props.size,this.props.proid)
                    //this.chandex()
                    }}>{pro.value}</button>
                     </li>
                    </ul>
                ))}
              
            </div>
        )
    }
}
