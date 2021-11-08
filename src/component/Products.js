import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Products extends Component {

    render() {
        return (
            <div >
                <div className="pro">
                <h>Category name</h>
                </div>
                <ul className="products">
                    {this.props.products.map(product=>(
                        <li key={product.id}>
                            <div className="icon-pos">
                            <div className={product.icon===1?"product card cardstyle":"product card"}>
                                <Link to={`/description/${product.id}`}>
  <img src={product.gallery[0]} alt={product.name}/>
  <div className={this.props.isVisible?"child":""}></div>
                                    <p>{product.name}</p>
                                    <p>{this.props.currn==="RUB"?this.props.getCurrencySymbol("ru",this.props.currn)
                                    :this.props.getCurrencySymbol("en",this.props.currn)}
                                     {product.prices.filter(pro => pro.currency === this.props.currn).map(p=>p.amount)}</p>
                                    </Link>
                            </div>
                            {product.icon===1?<img className="icon-img" src="/images/icon.png" alt=""/>:""}
                    
                          </div>   
                     </li>
                     
                    ))
                    
                    }
                    
                </ul>
            </div>
        )
    }
}
