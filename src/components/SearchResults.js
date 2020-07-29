import React, { useCallback } from 'react';
import {VK} from '../utils/consts.js';
import '../styles/SearchResults.scss';


export class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    
    this.offset = 0;

    this.state = {          
      profile: this.props.profile,
      isEntryPoint: true
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.backClick = this.backClick.bind(this);

    window.addEventListener('scroll', this.handleScroll);
  } 
  
  backClick() {
    this.setState({profile: null});
  }  
  
  handleClick(id) {  
    VK.Api.call('users.get', {user_ids: id, fields: ['photo_max', 'bdate'], v:"5.73"}, function(response) {
      if(response.response) {
        this.setState({
          profile: response.response[0],
        });
      }
    }.bind(this));
  }

  handleScroll() {
    if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
      this.offset += 10;
      this.props.getVKUsersOffset(this.offset);
      window.scrollBy(0, -20);
    }
  }
  
  render() {    
    if (this.state.profile != null) {                                                     
      return (
        <PickedProfile backClick={this.backClick} profile={this.state.profile} />
      )
    }
    
    const profiles = this.props.users.map(user => 
      <Profile
        handleClick={() => this.handleClick(user.id)}
        users={user}
      />
    );

    if (this.props.users[0] != undefined) {  
      return (
        <div className="results">
          {profiles}
        </div>
      )
    }
    else {
      if (this.state.isEntryPoint === true) {
        this.state.isEntryPoint = false;
        return (
          <p className="text-nothing-to-show">Введите запрос, чтобы получить список пользователей.</p>
        )
      }
      else {
        return (
          <p className="text-nothing-to-show">Ничего не найдено.</p>
        )
      }
    }
  }
}


function Profile(props) {
  return (
    <div className="profile" onClick={props.handleClick}>
      <img className="profile__avatar" src={props.users.photo} />
      <p className="profile__first-last-name">  
        {props.users.first_name + " " + props.users.last_name}
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