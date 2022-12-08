import React from 'react';
import { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import CountryListing from './pages/CountryListing/CountryListing';
import Splash from './pages/Splash/index'
import Header from './components/Header';
import Footer from './components/Footer';
import SingleCountryCont from './pages/SingleCountryCont/SingleCountryCont';
import './App.scss';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (

    <ApolloProvider client={client}>
      {/* <Dashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> */}
      <Router>
       
            <Routes>
            <Route 
                path="/splash" 
                element={<Splash />} 
              />
            <Route 
                path="/SingleCountry" 
                element={<SingleCountryCont />} 
              />
              <Route 
                path="/listings" 
                element={<CountryListing />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
            </Routes>     
      </Router>
    </ApolloProvider>
  );
}

export default App;
