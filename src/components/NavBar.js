import React, { useCallback } from 'react';
import '../styles/NavBar.scss'


export class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};
    
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    this.props.getVKUsers(event.target.value);
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  
  render() {
    return (
      <header>
        <nav>
          <form onSubmit={this.handleSubmit}>
            <input 
              className="Search" 
              type="search" 
              placeholder="Поиск" 
              onChange={this.handleInput}
            />
          </form>
        </nav>
      </header>
    )
  }
}