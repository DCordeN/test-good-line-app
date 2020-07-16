import React, { useCallback } from 'react';
import './App.scss';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  getSearchValue(className) {
    return document.getElementsByClassName(className)[0].value;
  }
  
  render() {
    return (
      <header>
        <nav>
          <form>
            <input className="Search" type="search" placeholder="Введите запрос" onInput={() => 
              {this.props.someFun(this.getSearchValue("Search"))}}/>
          </form>
        </nav>
      </header>
    )
  }
}


class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {response: []}
  }
  
  render () {
    if (this.props.response[0] != undefined) {
      return (
        <img src={this.props.response[0].photo} />
      );
    }
    else {
      return (
        <p>Нечего выводить:(</p>
      )
    }
  }
}


class App extends React.Component {        
  constructor(props) {
    super(props);
    this.state = {response: ''};
  }
  
  someFun = (value) => {
    const VK = window.VK;

    let ths = this;
    
    VK.Api.call('users.search', {q: value, fields: "photo", v:"5.73"}, function(response) {
      if(response.response) {
        if(response.response.count !== 0) {
          ths.setState({response: response.response.items});
          console.log(ths.state.response[0]);
          console.log('Привет, ' + response.response.items[0].first_name + response.response.items[0].photo);
        }
      }
  });
  };
  
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
  }

  render() {
    return (
      <div className="App">
        <NavBar someFun={this.someFun} />
        <SearchResults response={this.state.response} />
      </div>
    );
  }
};



export default App;
