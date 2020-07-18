import React, { useCallback } from 'react';
import '../styles/SearchResults.scss';


export class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.page = 0;
    this.state = {
      response: this.props.response,
      clean: this.props.clean,
      profile: this.props.profile
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.backClick = this.backClick.bind(this);
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

  handleClick(e) {
    const VK = window.VK;
    
    let id;
    let parent = e.target.parentElement;
    for (let i = 0; i < this.props.response.length; i++) {
      if (parent.children[0].src == this.props.response[i].photo) {
        id = this.props.response[i].id;
        break;
      }
    }
  
    VK.Api.call('users.get', {user_ids: id, fields: ['photo_max', 'bdate'], v:"5.73"}, function(response) {
      if(response.response) {
        if(response.response.count !== 0) {
          this.setState({
            profile: response.response[0],
          });
        }
      }
    }.bind(this));
  }

  backClick() {
    this.setState({profile: null});
  }

  
  render() {    
    if (this.state.clean == true) {
      this.page = 0;
    }      

    if (this.state.profile != null) {
      if (this.state.profile.bdate != undefined) {
        return (
          <div className="PickedProfile">
            <button onClick={this.backClick} className="BackButton">←Назад</button>
            <img src={this.state.profile.photo_max} className="Avatar" />
            <div className="Desk">
              <p className="Id">id: {this.state.profile.id}</p>
              <p className="FirstName">Имя: {this.state.profile.first_name}</p>
              <p className="LastName">Фамилия: {this.state.profile.last_name}</p>
              <p className="Bdate">Дата рождения: {this.state.profile.bdate}</p>
            </div>
          </div>
        )
      }
      else {
        return (
          <div className="PickedProfile">
            <button onClick={this.backClick} className="BackButton">Назад</button>
            <img src={this.state.profile.photo_max} className="Avatar" />
            <div className="Desk">
              <p className="Id">id: {this.state.profile.id}</p>
              <p className="FirstName">Имя: {this.state.profile.first_name}</p>
              <p className="LastName">Фамилия: {this.state.profile.last_name}</p>
            </div>
          </div>
        )
      }
    }
    let profiles = [];
    if (this.props.response[0] != undefined) {
      for (let i = 0; i < 10 + this.page && i < this.props.response.length; i++) {
        profiles.push(
          <div className="Profile" onClick={this.handleClick}>
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
      )
    }
    else {
      return (
        <p className="NothingToShow">Введите запрос, чтобы получить список людей!</p>
      )
    }
  }
}