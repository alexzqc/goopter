import React from "react";
import { Redirect } from 'react-router-dom';

const BASE_URL = 'https://api-qa.goopter.com/api/rest/';
const AUTH_TOKEN = "auth_token";
const AUTH_USERNAME = "auth_username";

class login extends React.Component {
    constructor() {
        super();
        this.state  = {
          loginMessage : "",
          token:"",
          isLogin: false,
          isLogout: true,
          userName: ""
        };
        this.login         = this.login.bind(this);
    }

async login(e) {
        const email      = this.email.value;
        const password   = this.password.value;
      
        const URL           = BASE_URL + 'v8/login';
        this.email.value    = ""; // Clear input.  
        this.password.value = ""; // Clear input. 
        this.setState({ userName: email });
          
        await fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data:{
                    email: email, 
                    password: password
                }
              
            })
        })
        // Response received.
        .then(response => response.json())
            // Data retrieved.
            .then(json => {
                // Store token with session data.
                if(json["RC"]===100) {
                  //sessionStorage.setItem(AUTH_TOKEN, json["token"]);
                 //sessionStorage.setItem(AUTH_USERNAME, email.toLocaleLowerCase());
                 alert("Login success!")
                  window.location.reload(true);
                }
                else {
                  this.setState({loginMessage:
                    "An error occured at login. Try again." }); 
                }
            })
            // Data not retrieved.
            .catch(function (error) {
                if(sessionStorage[""])
                alert(error);
            })
            console.log(this.state.token); 
            if(this.state.token != ""){
              this.setState({ isLogin: true,
                isLogout:false });
            }
            
            
      }   

render(){
return(
<div className="container">
    <br/><br/><br/>
    <h2>Please log in</h2>
    <br/>
    <table>
    <thead>
    <tr>
    <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> Email: </td>
                      <td> <input type='text' ref={(emailInput) => this.email = emailInput} /> </td>
                    </tr>
                    <tr>
                      <td>Password: </td>
                      <td> <input type="password"  ref={(passwordInput) => this.password = passwordInput} /></td>
                    </tr>
                    <tr><td><br/><button onClick={this.login}>Login</button></td></tr>
                  </tbody>
                </table>
</div>
);
}
}

export default login;