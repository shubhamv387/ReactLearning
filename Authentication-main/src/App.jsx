import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext } from 'react';
import authContext from './store/auth-context';

function App() {
  const authCtx = useContext(authContext);

  return (
    <Layout>
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>

        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}

        <Route path='/profile'>
          {authCtx.isLoggedIn ? <UserProfile /> : <Redirect to='/auth' />}
        </Route>

        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
