import React from 'react';
import './App.css';


function App() {  
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
  
  return (
    <div className="App">
    </div>
  );
}


export default App;
