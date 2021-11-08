import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Price from './Price';
export default class Bag extends Component {
    render() {
        const {cartitems}=this.props;
        return (
            <div>
                <div className={cartitems.length<=2?"bagcontainer":"bagcontainer bar"}>
                <h>My Bag</h>,{cartitems.length} items
                 <ul>
                        {cartitems.map((item)=>(
                          <li key={item.id}> 
                    <div className="bagdet" >
                                 <div className="bagtitle">
                                 {item.name}
                                    <div className="bagbrand">
                                    {item.brand}
                                    </div>
                                </div>
                                <div className="bagprice">
                                <Price currn={this.props.currn} price={item.prices}/>
                                </div>
                                <div >
                                {item.items.map((pro,index)=>(
                    <div className="sizeshow" key={index}>
                     <li><button style={{backgroundColor:pro.type==="swatch"?pro.choose:"",
                     color:pro.type==="swatch"?pro.choose:"",
                     border:pro.type==="swatch"?"1px solid black":""}}>{pro.choose}</button></li>
                    </div>))}

                                
                                </div>
                                </div>
                                <div className="bagspace">
                                <div className="bagmaxmin">
                                <button onClick={()=>this.props.addtocart(item)} className="bagmax">+</button>
                                <p>{item.count}</p>
                                    <button onClick={()=>this.props.removefromcard(item)} className="bagmin">-</button>
                                </div>
                               <li> <div className="bagimg">
                                <img src={item.gallery[0]} alt={item.name}></img>
                                </div>
                                  </li>
                                 
                              </div>
                             
                          </li>
                        ))}
                    </ul>
                    <div className="bagtotal">
                    {cartitems.length!==0 &&(
                        <div>
                        <p>Total</p>
                        <h>{this.props.currn==="RUB"?this.props.getCurrencySymbol("ru",this.props.currn):this.props.getCurrencySymbol("en",this.props.currn)}
                        {cartitems.reduce((a,c)=> a + c.prices.filter(pro => pro.currency === this.props.currn).map(p=>p.amount) * c.count,0)}</h>
                        </div>
                    )}
                     </div>
                    <div className="bagbtn">
                    <Link to='/cart'>
                        <button onClick={()=>this.props.isElVisible} className="bagbtnview">VIEW BAG</button></Link>
                        <button className="bagbtncheck">CHECK OUT</button>
                    </div>
                 </div>
                </div>
        )
    }
}
