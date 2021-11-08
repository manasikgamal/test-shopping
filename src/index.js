import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery
} from "@apollo/client";
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

client
.query({
  query: gql`
    query getpro {
          category{
            products{
              name
              gallery
             prices {
              currency
              amount
            } 
            
                }
              }    
    }
  `
}).then(response => response.data.data)
.then(result => console.log(result));
const getproduct= gql`
{
  category{
    products{
      name
      gallery
     prices {
      currency
      amount
    } 
    
        }
      }
    }    
`

const Productlist = (props) => {
    const { data, loading, error } = useQuery(getproduct)
    return data;
}
ReactDOM.render(
  <ApolloProvider client={client} >
  <BrowserRouter> <App /></BrowserRouter>
  </ApolloProvider>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
