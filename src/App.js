import './App.css';
import React from 'react';
import Header from './component/Header';
import Products from './component/Products';
import { Route } from 'react-router';
import Description from './component/Description';
import Cart from './component/Cart';
import Bag from './component/Bag';
import{gql} from "@apollo/client";
import {Query} from '@apollo/client/react/components';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products:localStorage.getItem('products')
      ? JSON.parse(localStorage.getItem('products'))
      : this.props.products.category.products,
      cartitems:localStorage.getItem("cartitems")?JSON.parse(localStorage.getItem("cartitems")):[],
      isVisible: false,
      iscurrnvisible:false,
      currn:"USD",
      attribut:"",
      value:"",
      disable:true,
      items:[]
    }}
    chandedesable=(e)=>{
     this.setState({disable:e})
    }
    onattributclick=(value,pros,proid,size)=>{
      const products=this.state.products.slice()
      const newsize=localStorage.getItem('items')
      ? JSON.parse(localStorage.getItem('items'))
      : size
      const mno=newsize.map(item=>(
      item.id===pros?{...item,choose:value}:item 
      ))
      //localStorage.setItem("size",JSON.stringify(newsize)
      localStorage.setItem("items",JSON.stringify(newsize.map(item=>(
        item.id===pros?{...item,choose:value}:item
      ))))
      //this.setState({products})
      this.setState ({products:products.map(item=>(
       item.id===proid?{...item,items:mno}:item 
     ))})
     
     }
   full=()=>{
    const pro=this.state.products.slice();
    //const mno=pro.map(p=>p.attributes.map(a=>a.items.map(i=>i.value)))
    
    //mno.forEach((item)=>{item.value.push({soso:"soso"})})
    //this.setState ({items:pro.map(p=>p.attributes.map(a=>a.items.map(i=>i.value))
   // )})
    console.log("mno",pro)
    //console.log(this.state.items);
   }
    fullitems=(target)=>{
      const pro=this.state.products[0].attributes[0].items.slice();
      this.setState({items:target})
      console.log(this.state.items)
      }
    isElVisible=()=> {
      this.setState({isVisible: !this.state.isVisible});
      console.log(this.state.isVisible)
   }
   iscurrnv=()=>{
    this.setState({iscurrnvisible: !this.state.iscurrnvisible});
   }
   changecurrn=(e)=>{
    this.setState({currn:e.target.value})
    const products=this.state.products.slice()
    this.setState({products})
   }

   
    addtocart=(product)=>{
      const cartitems=this.state.cartitems.slice();
      let alreadyincart=false
      cartitems.forEach((item)=>{
        if(item.id===product.id){
          item.count++;
          alreadyincart=true
        }
      })
      if(!alreadyincart){
        cartitems.push({...product,count:1})
      }
       this.setState ({cartitems})
       localStorage.setItem("cartitems",JSON.stringify(cartitems))
    }
    removefromcard=(product)=>{
      const cartitems=this.state.cartitems.slice();
    const exist=cartitems.find((x)=>x.id===product.id)
    if(exist.count===1){
      this.setState({cartitems:cartitems.filter((x)=>x.id!==product.id)})
      localStorage.setItem("cartitems",JSON.stringify(cartitems.filter((x)=>x.id!==product.id)))
      const products=this.state.products.slice();
      this.setState ({products:products.map(item=>(
        item.id===product.id?{...item,icon:0}:item
      ))})
      localStorage.setItem("products",JSON.stringify(products.map(item=>(
        item.id===product.id?{...item,icon:0}:item
      ))))
    }
    else{
      this.setState({cartitems:cartitems.map((x)=>x.id===product.id?
      {...exist,count:exist.count-1}:x)
    })
    localStorage.setItem("cartitems",JSON.stringify(cartitems.map((x)=>x.id===product.id?
    {...exist,count:exist.count-1}:x)))
    }
  }
    addicon=(product)=>{
     // const products=this.state.products.slice();
      const products = localStorage.getItem('products')
      ? JSON.parse(localStorage.getItem('products'))
      : this.state.products.slice()
      this.setState ({products:products.map(item=>(
        item.id===product.id?{...item,icon:1}:item
      ))})
      localStorage.setItem("products",JSON.stringify(products.map(item=>(
        item.id===product.id?{...item,icon:1}:item
      ))))
      console.log(products)
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
    
  render(){
  this.full()
    return (
      <div>
        <div>
        </div>
        <header>
          <Header iscurrnvisible={this.state.iscurrnvisible} currn={this.state.currn} currnvisible={this.iscurrnv} currency={this.state.products} onclick={this.changecurrn} cartitems={this.state.cartitems} isElVisible={this.isElVisible}/>
          {this.state.isVisible? <Bag isElVisible={this.isElVisible} currn={this.state.currn} getCurrencySymbol={this.getCurrencySymbol} cartitems={this.state.cartitems} 
          addtocart={this.addtocart} removefromcard={this.removefromcard} /> : '' } 
        </header>
        <Route path='/' exact>
        <main>
        <div className={this.state.isVisible? "container":""}>
         <Products getCurrencySymbol={this.getCurrencySymbol} currn={this.state.currn} products={this.state.products} isVisible={this.state.isVisible} ></Products>
        </div>
        </main>
       </Route>
       <div className={this.state.isVisible? "container":""}>
       <Route path={'/description/:id'} >
         <Description chandedesable={this.chandedesable} disable={this.state.disable} fullitems={this.fullitems} onattributclick={this.onattributclick} description={this.state.products} addtocart={this.addtocart} addicon={this.addicon}
        isVisible={this.state.isVisible} currn={this.state.currn}/>
       </Route>
       </div>
       <div className={this.state.isVisible? "container":""}>
       <Route path='/cart'>
         <Cart items={this.state.items} currn={this.state.currn} cartitems={this.state.cartitems} addtocart={this.addtocart} removefromcard={this.removefromcard}
         isVisible={this.state.isVisible}/>
      </Route>
      </div>
      </div>
    );
  }
  
}

const getproduct= gql`
{
  category{
    products{
        id
      name
      brand
      gallery
     prices {
      currency
      amount
    } 
    description
    attributes{
      id
      name
      type
      items{
        id
        value
        displayValue
      }
    }
        }
      }
    }    
`
 export default ()=>(
    <Query query={getproduct}>
  {({loading,error,data})=>{
  if(loading) return <p>loading</p>
  if(error) return <p>Error:</p>
   return <App products={data}/>;
  }}
  </Query>
 )
 