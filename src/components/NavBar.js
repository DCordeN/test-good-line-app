import React, { useCallback } from 'react';
import {throttle} from 'lodash';
import '../styles/NavBar.scss';


export class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {inputValue: ''};
    
    this.handleInput = this.handleInput.bind(this);
    this.handleInputThrolled = throttle(this.handleInput, 2000)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _onChange = (e) => {
    e.persist();
    this.handleInputThrolled(e);
  }; 

  handleInput(event) {
    this.props.getVKUsers(event.target.value);
    this.setState({inputValue: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  
  render() {
    return (
      <header>
        <nav>
          <form className="search-form" onSubmit={this.handleSubmit}>
            <input 
              className="search-form__input" 
              type="search" 
              placeholder="Поиск" 
              onChange={this._onChange}
            />
          </form>
        </nav>
      </header>
    )
  }
}