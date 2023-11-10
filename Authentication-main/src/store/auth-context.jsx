import React, { useEffect, useState } from 'react';

const authContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const tokenExpiresAtTime = localStorage.getItem('expiresIn');

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const timer = 5 * 60 * 1000;

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
      {props.children}
    </authContext.Provider>
  );
};

export default authContext;
