import React, { useEffect, useState } from 'react';

const authContext = React.createContext({
  token: '',
  isLoggedIn: false,
  // eslint-disable-next-line no-unused-vars
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const tokenExpiresAtTime = localStorage.getItem('expiresIn');

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const timer = 1 * 60 * 1000;

  const tokenExpireHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    setToken(null);
    alert('token expired!');
  };

  useEffect(() => {
    if (Object.keys(localStorage).indexOf('expiresIn') !== -1) {
      if (Date.now() - timer <= tokenExpiresAtTime) {
        setTimeout(() => {
          tokenExpireHandler();
        }, timer - (Date.now() - tokenExpiresAtTime));
      } else {
        tokenExpireHandler();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', Date.now());
    // setTimeout(() => tokenExpireHandler(), timer);
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
