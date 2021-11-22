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
      items:[],
      name:"/"
    }}
    changename=(name)=>{
      this.setState({name:name})
    }
    onattributclick=(value,pros,proid,size,key)=>{
      const products=this.state.products.slice()
      products.forEach((pro)=>{
          const newsize=localStorage.getItem('items') && pro.id===proid
          ? JSON.parse(localStorage.getItem('items'))
          : size
          const mno=newsize.map(item=>(
          item.id===pros?{...item,choose:value,key:key,ctr:1,proid:proid}:item
          ))
          //localStorage.setItem("size",JSON.stringify(newsize)
          localStorage.setItem("items",JSON.stringify(newsize.map(item=>(
            item.id===pros?{...item,choose:value,key:key,ctr:1,proid:proid}:item
          ))))
          this.setState ({products:products.map(item=>(
           item.id===proid?{...item,attributes:mno}:item 
         ))})
      })
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
          const pro=product.attributes.map(p=>p.choose)
         const mno=item.attributes.map(a=>a.choose)
         if(JSON.stringify(mno)===JSON.stringify(pro)){
         item.count++;
         alreadyincart=true
        }
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
    //const exist=cartitems.find((x)=>x.attributes.map(a=>a.proid)===product.id)
    cartitems.forEach(element=>{  
      if(element.id===product.id)
      if(JSON.stringify(element.attributes.map(a=>a.choose))
    ===JSON.stringify(product.attributes.map(p=>p.choose))){
      if(element.count===1){
       // console.log("yes",exist)
        this.setState({cartitems:cartitems.filter((x)=>x!==element)})
        localStorage.setItem("cartitems",JSON.stringify(cartitems.filter((x)=>x!==element)))
        const products=this.state.products.slice();
        let n=0
        cartitems.forEach((item)=>{
          if(item.id===product.id)
          n++
        })
        if(n===1)
        {
        this.setState ({products:products.map(item=>(
          item.id===product.id?{...item,icon:0}:item
        ))})
        localStorage.setItem("products",JSON.stringify(products.map(item=>(
          item.id===product.id?{...item,icon:0}:item
        ))))
      }
      }
      else{
        this.setState({cartitems:cartitems.map((x)=>x.id===product.id &&
        JSON.stringify(x.attributes.map(a=>a.choose))===JSON.stringify(product.attributes.map(p=>p.choose))?
        {...element,count:element.count-1}:x)
      })
      localStorage.setItem("cartitems",JSON.stringify(cartitems.map((x)=>x.id===product.id &&
      JSON.stringify(x.attributes.map(a=>a.choose))===JSON.stringify(product.attributes.map(p=>p.choose))?
      {...element,count:element.count-1}:x)))
      }}

    }
    )
    
  }
    addicon=(product)=>{
     // const products=this.state.products.slice();
      const products = localStorage.getItem('products')
      ? JSON.parse(localStorage.getItem('products'))
      : this.state.products.slice()
      this.setState ({products:products.map(item=>(
        item.id===product.id?{...item,icon:1,ctr:0}:item
      ))})
      localStorage.setItem("products",JSON.stringify(products.map(item=>(
        item.id===product.id?{...item,icon:1,ctr:0}:item
      ))))
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

    return (
      <div>
        <div>
        </div>
        <header>
          <Header changename={this.changename} iscurrnvisible={this.state.iscurrnvisible} currn={this.state.currn} currnvisible={this.iscurrnv} currency={this.state.products} onclick={this.changecurrn} cartitems={this.state.cartitems} isElVisible={this.isElVisible}/>
          {this.state.isVisible? <Bag isElVisible={this.isElVisible} currn={this.state.currn} getCurrencySymbol={this.getCurrencySymbol} cartitems={this.state.cartitems} 
          addtocart={this.addtocart} removefromcard={this.removefromcard} /> : '' } 
        </header>
        <Route path='/' exact>
        <main>
        <div className={this.state.isVisible? "container":""}>
         <Products name={this.state.name} addchose={this.addchose} getCurrencySymbol={this.getCurrencySymbol} currn={this.state.currn} products={this.state.products} isVisible={this.state.isVisible} ></Products>
        </div>
        </main>
       </Route>
       <div className={this.state.isVisible? "container":""}>
       <Route path={'/description/:id'} >
         <Description deletectr={this.deletectr}  tocart={this.tocart} disable={this.state.disable} onattributclick={this.onattributclick} description={this.state.products} addtocart={this.addtocart} addicon={this.addicon}
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
    name
    products{
        id
      name
      brand
      category
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
 