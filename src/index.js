import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle'; 
import initAvesomeIcons from './Icons/initAvesomeIcons';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

initAvesomeIcons();

const graphClient = new ApolloClient({
    uri: process.env.REACT_APP_API_SERVER,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_API_JWT_TOKEN}`
    }
})

ReactDOM.render(
    <ApolloProvider client={graphClient}>
        <App />
    </ApolloProvider>    
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
