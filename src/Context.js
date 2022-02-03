import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data'; //import data from helper functions 

export const Context = React.createContext(); 
// Context class component 
export class Provider extends Component {

  // initializes instance of data, cookie, and authenticated user data 
  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get('authenticatedUser');

    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null

    };
  }

  render() {
    const { 
      authenticatedUser,
    
               } = this.state;
    const value = {
      authenticatedUser,
     
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  // signIn() method that returns authenticated users data from API upon submitting, persists user's data with cookies
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    
    if (user !== null) {
      user.password = password;
      this.setState(() => {
       
        return {
          authenticatedUser: user,
        
        };
      });
      const cookieOptions = {
        expires: 1 // 1 day
      };
      Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
    }
    return user;
  }

  // method that removes authenticated users data from global state and redirects to main courses screen
  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

