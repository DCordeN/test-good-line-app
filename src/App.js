import React from 'react';
import './App.css';

class NavBar extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <form method="get">
            <input type="search" />
            <button type="submit">Поиск</button>
          </form>
        </nav>
      </header>
    )
  }
}

class App extends React.Component {  
  componentDidMount() {
    const VK = window.VK;
    VK.init({
      apiId: 7539562
    });
    VK.Auth.login(function(response) {
      if (response.session) {
        console.log(response.session);
      }
    });
    VK.Api.call('users.get', {user_ids: [1, 2], v:"5.73"}, function(response) {
      if(response.response) {
        console.log('Привет, ' + response.response[0].first_name);
      }
    });
  }
  render() {
    return (
      <div className="App">
        <NavBar />
      </div>
    );
  }
};



export default App;
