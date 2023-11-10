import React, { useState } from 'react';

const authContext = React.createContext({
  token: '',
  isLoggedIn: false,
  // eslint-disable-next-line no-unused-vars
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <authContext.Provider value={contextValue}>
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
    </authContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default authContext;
