import { Route, Switch } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/profile' component={UserProfile} />
        <Route exact path='/auth' component={AuthPage} />
      </Switch>
    </Layout>
  );
}

export default App;
