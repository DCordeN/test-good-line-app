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

  handleClick(id) {
    const VK = window.VK;
  
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
          <PickedProfile backClick={this.backClick} profile={this.state.profile}/>
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
          <Profile 
            handleClick={() => this.handleClick(this.props.response[i].id)} 
            response={this.props.response[i]}
          />
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

function Profile(props) {
  return (
    <div className="Profile" onClick={() => props.handleClick(props.response.id)}>
      <img className="Photos" src={props.response.photo} />
      <p className="FirstLastName">  
        {props.response.first_name + " " + props.response.last_name}
      </p>
    </div>
  );
}

function PickedProfile(props) {
  return (
    <div className="PickedProfile">
      <button onClick={props.backClick} className="BackButton">Назад</button>
      <img src={props.profile.photo_max} className="Avatar" />
      <div className="Desk">
        <p className="Id">id: {props.profile.id}</p>
        <p className="FirstName">Имя: {props.profile.first_name}</p>
        <p className="LastName">Фамилия: {props.profile.last_name}</p>
      </div>
    </div>
  )
}