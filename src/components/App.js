import React, { useCallback } from 'react';
import '../styles/App.scss';
import {VK} from '../utils/consts.js';
import {SearchResults} from './SearchResults.js';
import {NavBar} from './NavBar';


class App extends React.Component {        
  constructor(props) {
    super(props);
    
    this.state = {
      response: [],
      profile: null
    };
  }  

  getVKUsers = (value) => {
    this.state.response = [];

    VK.Api.call('users.search', {q: value, fields: "photo", count: 10, v:"5.73"}, function(response) {
      if(response.response) {
        this.setState({
          response: response.response.items,
          profile: null
        });
      }
    }.bind(this));

  };
  
  componentDidMount() {
    VK.init({
      apiId: 7539562
    });
    
    VK.Auth.getLoginStatus(function(response) {
      if (response.status === "unknown" || response.status === "not_authorized") {          
        VK.Auth.login(function(response) {});
      }
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar getVKUsers={this.getVKUsers} />
        <SearchResults response={this.state.response} profile={null} />
      </div>
    );
  }
};



export default App;
