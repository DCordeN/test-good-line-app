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
      users: [],
      profile: null
    };
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

  getVKUsers = (inputValue) => {
    this.state.users = [];

    VK.Api.call('users.search', {q: inputValue, fields: "photo", count: 10, v: "5.73"}, function(response) {
      if(response.response) {
        this.setState({
          inputValue: inputValue,
          users: response.response.items,
          profile: null
        });
      }
    }.bind(this));

  };

  getVKUsersOffset = (offset) => {
    VK.Api.call('users.search', {q: this.state.inputValue, fields: "photo", count: 10, offset: offset, v: "5.73"}, function(response) {
      if (response.response) {
        let newUsers = this.state.users;
        response.response.items.forEach(element => {
          newUsers.push(element);
        });

        this.setState({
          users: newUsers
        });
      }
    }.bind(this));
  }

  render() {
    return (
      <div className="App">
        <NavBar getVKUsers={this.getVKUsers} />
        <SearchResults           
          inputValue={this.state.inputValue}
          users={this.state.users} 
          profile={null} 
          getVKUsersOffset={this.getVKUsersOffset}
        />
      </div>
    );
  }
};



export default App;
