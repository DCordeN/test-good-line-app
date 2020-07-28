import React, { useCallback } from 'react';
import {VK} from '../utils/consts.js';
import '../styles/SearchResults.scss';


export class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    
    this.offset = 0;

    this.state = {
      response: this.props.response,
      profile: this.props.profile
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.backClick = this.backClick.bind(this);

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps() {
    this.offset = 0;
  }

  handleScroll() {
    if (document.documentElement.scrollHeight - document.documentElement.clientHeight === document.documentElement.scrollTop) {
      this.offset += 10;
    }

    //тут сделать вызов ф-ии колбэка
  }

  handleClick(id) {  
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
    if (this.state.profile != null) {
      if (this.state.profile.bdate != undefined) {
        return (
          <PickedProfile backClick={this.backClick} profile={this.state.profile}/>
        )
      }
      else {
        return (
          <div className="profile-picked">
            <button onClick={this.backClick} className="button-back">Назад</button>
            <img src={this.state.profile.photo_max} className="profile-picked__avatar" />
            <div className="profile-picked__description">
              <p className="description__id">id: {this.state.profile.id}</p>
              <p className="description__first-name">Имя: {this.state.profile.first_name}</p>
              <p className="description__last-name">Фамилия: {this.state.profile.last_name}</p>
            </div>
          </div>
        )
      }
    }
    const profiles = this.props.response.map(user => 
      <Profile
        handleClick={() => this.handleClick(user.id)}
        response={user}
      />
    );
    if (this.props.response[0] != undefined) {  
      return (
        <div className="results">
          {profiles}
        </div>
      )
    }
    else {
      return (
        <p className="text-nothing-to-show">Введите запрос, чтобы получить список людей!</p>
      )
    }
  }
}

function Profile(props) {
  return (
    <div className="profile" onClick={props.handleClick}>
      <img className="profile__avatar" src={props.response.photo} />
      <p className="profile__first-last-name">  
        {props.response.first_name + " " + props.response.last_name}
      </p>
    </div>
  );
}

function PickedProfile(props) {
  return (
    <div className="profile-picked">
      <button onClick={props.backClick} className="button-back">Назад</button>
      <img src={props.profile.photo_max} className="profile-picked__avatar" />
      <div className="profile-picked__description">
        <p className="description__id">id: {props.profile.id}</p>
        <p className="description__first-name">Имя: {props.profile.first_name}</p>
        <p className="description__last-name">Фамилия: {props.profile.last_name}</p>
      </div>
    </div>
  )
}