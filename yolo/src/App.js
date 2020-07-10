import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { history } from './store';
import ProtectedRoute from './utils/guards';
import LoginContainer from './containers/userLoginContainer';
import RegisterContainer from './containers/userRegisterContainer';
import ProviderLoginContainer from './containers/providerLoginContainer';
import ProviderRegisterContainer from './containers/providerRegisterContainer';
import ProviderDashboardContainer from './containers/providerDashboardContainer';
import AdminLoginContainer from './containers/adminLoginContainer';
import NotFound from './components/NotFound/NotFound';
import HomeContainer from './containers/homeContainer';
import AdminDashboardContainer from './containers/adminDashboardContainer';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';
import log from "./utils/logger.service";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  fetch('https://api.ipify.org?format=jsonp?callback=?',{
    method:'GET',
    headers:{},
  })
  .then(res=>{
    return res.text()
  }).then(ip=>{
    var str="Request from IP: "+ip;
    log(str);
  })
  return (
    <div className="App">
      <div className="App-intro">
        <Router history={ history }>
          <Switch>
            <Route exact path="/" component={ HomeContainer } />
            <Route exact path="/register" component={ RegisterContainer } />
            <Route exact path="/login" component={ LoginContainer } />
            <Route exact path="/provider/login" component = {ProviderLoginContainer} />
            <Route exact path="/provider/register" component = {ProviderRegisterContainer} />
            <Route exact path="/admin/login" component={AdminLoginContainer} />
            <ProtectedRoute path="/dashboard" component={ Dashboard } />
            <ProtectedRoute path="/provider/dashboard" component= {ProviderDashboardContainer} />
            <ProtectedRoute path="/admin/dashboard" component= {AdminDashboardContainer} />
            <Route path="*" component={ NotFound } />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
