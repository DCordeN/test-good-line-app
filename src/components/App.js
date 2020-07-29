import React, { useCallback } from 'react';
import '../styles/App.scss';
import {VK} from '../utils/consts.js';
import {SearchResults} from './SearchResults.js';
import {NavBar} from './NavBar';


class App extends React.Component {        
  constructor(props) {
    super(props);
    
    this.state = {
      inputValue: "",
      response: [],
      profile: null
    };
  }  

  getVKUsers = (inputValue) => {
    this.state.response = [];

    VK.Api.call('users.search', {q: inputValue, fields: "photo", count: 10, v: "5.73"}, function(response) {
      if(response.response) {
        this.setState({
          inputValue: inputValue,
          response: response.response.items,
          profile: null
        });
        console.log(this.state.response);
      }
    }.bind(this));

  };

  getVKUsersOffset = (offset) => {
    VK.Api.call('users.search', {q: this.state.inputValue, fields: "photo", count: 10, offset: offset, v: "5.73"}, function(resp) {
      if (resp.response) {
        let newResponse = this.state.response;

        resp.response.items.forEach(element => {
          newResponse.push(element);
        });

        console.log(this.state.response);

        this.setState({
          response: newResponse
        });
      }
    }.bind(this));
  }
  
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
        <SearchResults 
          response={this.state.response} 
          profile={null} 
          inputValue={this.state.inputValue}
          getVKUsersOffset={this.getVKUsersOffset}
        />
      </div>
    );
  }
};



export default App;
