import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import ContainerOfLeagues from './components/ContainerOfLeagues';
import ContainerOfCommands from './components/ContainerOfCommands';
import LeagueInfo from './components/ContainerOfLeagues/LeagueInfo';
import CommandInfo from './components/ContainerOfCommands/CommandTab/CommandInfo';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/FootballManager/league" component={ContainerOfLeagues} />
        <Route exact path="/FootballManager/commands" component={ContainerOfCommands} />
        <Route path="/league/:slug" component={LeagueInfo} />
        <Route path="/commands/:slug" component={CommandInfo} />
      </Switch>
    </Router>
  );
}

export default App;
