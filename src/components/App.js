import React, { useCallback } from 'react';
import '../styles/App.scss';
import {SearchResults} from './SearchResults.js';
import {NavBar} from './NavBar';


class App extends React.Component {        
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      clean: false,
      profile: null
    };
  }

  getVKUsers = (value) => {
    const VK = window.VK;
    
    VK.Api.call('users.search', {q: value, fields: "photo", count: 200, v:"5.73"}, function(response) {
      if(response.response) {
        if(response.response.count !== 0) {
          this.setState({
            response: response.response.items,
            clean: true,
            profile: null
          });
        }
      }
    }.bind(this));
  };
  
  componentDidMount() {
    const VK = window.VK;
    VK.init({
      apiId: 7539562
    });
    
    VK.Auth.getLoginStatus(function(response) {
      if (response.status === "unknown" || response.status === "not_authorized") {          
        VK.Auth.login(function(response) {	
          //
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar getVKUsers={this.getVKUsers} />
        <SearchResults response={this.state.response} clean={this.state.clean} profile={null} />
      </div>
    );
  }
};



export default App;
