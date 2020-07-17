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
            <input className="Search" type="search" placeholder="Поиск" onInput={() => 
              {this.props.getVKUsers(this.getSearchValue("Search"))}}/>
          </form>
        </nav>
      </header>
    )
  }
}


class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.page = 0;
    this.state = {
      response: [],
      clean: this.props.clean
    }
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps() {
    this.page = 0;
  }


  handleScroll() {
    if (document.documentElement.scrollHeight - document.documentElement.clientHeight < document.documentElement.scrollTop) {
      this.page += 10;
    }
    this.setState({clean: false});
  }
  
  render () {    
    if (this.state.clean == true) {
      this.page = 0;
    }
    let profiles = [];
    if (this.props.response[0] != undefined) {
      for (let i = 0; i < 10 + this.page && i < this.props.response.length; i++) {
        profiles.push(
          <div className="Profile">
            <img className="Photos" src={this.props.response[i].photo} />
            <p className="FirstLastName">  
              {this.props.response[i].first_name + " " + this.props.response[i].last_name}
            </p>
          </div>
        );
      }    
      return (
        <div className="Results">
          {profiles}
        </div>
      );
    }
    else {
      return (
        <p class="NothingToShow">Введите запрос, чтобы получить список людей!</p>
      )
    }
  }
}


class App extends React.Component {        
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      clean: false
    };
  }

  getVKUsers = (value) => {
    const VK = window.VK;
    
    VK.Api.call('users.search', {q: value, fields: "photo", count: 200, v:"5.73"}, function(response) {
      if(response.response) {
        if(response.response.count !== 0) {
          this.setState({
            response: response.response.items,
            clean: true
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
    VK.Auth.login(function(response) {
      if (response.session) {
        console.log(response.session);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar getVKUsers={this.getVKUsers} />
        <SearchResults response={this.state.response} clean={this.state.clean} />
      </div>
    );
  }
};



export default App;
