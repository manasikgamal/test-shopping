import React, { Component } from 'react'
import Currency from './Currency';
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
          bgColor: "2px solid rgb(89,235, 133)",
          color:"rgb(89,235, 133)",
          bgColor1:"",
          color1:"",
          bgColor2:"",
          color2:"",
          tran:""
        }
      }
      getCurrencySymbol=(locale, currency)=> {
        return (0).toLocaleString(
          locale,
          {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }
        ).replace(/\d/g, '').trim()
      }

      boxClick = (e) => {
        this.setState({
          bgColor: "2px solid rgb(89,235, 133)",
          color:"rgb(89,235, 133)",
          color1:"",
          color2:"",
          bgColor1:"",
          bgColor2:""
        })
      } 
      boxClick1 = (e) => {
        this.setState({
          bgColor: "",
          color1:"rgb(89,235, 133)",
          color:"",
          color2:"",
          bgColor1:"2px solid rgb(89,235, 133)",
          bgColor2:""
        })
      }
      boxClick2 = (e) => {
        this.setState({
          bgColor: "",
          bgColor1:"",
          color2:"rgb(89,235, 133)",
          color:"",
          color1:"",
          bgColor2:"2px solid rgb(89,235, 133)"
        })
      }    
      trans=()=>{
        this.setState({
          tran: "rotate(0)"})
      }
      trans2=()=>{
        this.setState({
          tran: "rotate(180deg)"})
      }
    render() {
        return (
            <div>
         <div className="hcontainer">
          <ul>
          <li><button onClick={this.boxClick} style={{borderBottom: this.state.bgColor,color:this.state.color}}> WOMEN</button></li>
          <li><button onClick={this.boxClick1} style={{borderBottom: this.state.bgColor1,color:this.state.color1}}> MEN</button></li>
          <li><button onClick={this.boxClick2} style={{borderBottom: this.state.bgColor2,color:this.state.color2}}> KIDS</button></li>
          </ul>
          <div className="refresh">
          <img src="/images/m1.PNG" alt=""/>
          </div >
        
          <div className='line'>
          <div className="select-container">
            <div className="hselect">
            <input type="text" value= {this.props.currn=="RUB"?this.getCurrencySymbol("ru",this.props.currn):this.getCurrencySymbol("en", this.props.currn)}/>
            <button  onClick={()=>{this.props.currnvisible();this.props.iscurrnvisible?this.trans():this.trans2()}} style={{transform:this.state.tran}}>^</button>
            </div>
        {this.props.iscurrnvisible?
         <Currency change={this.getCurrencySymbol}  onclick={this.props.onclick} currn={this.props.currency} />:""}

        </div>
        <div className='shop' onClick={this.props.isElVisible}>
        <img  src="/images/m5.PNG" alt=""/>
        {this.props.cartitems.length === 0?""
          :<span  id='lblCartCount'> {this.props.cartitems.length} </span>
        }
        </div>
          
          </div>
        </div>
                
            </div>

        )
    }
}
