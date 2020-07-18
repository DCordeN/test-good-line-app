import React, { useCallback } from 'react';
import '../styles/NavBar.scss'


export class NavBar extends React.Component {
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