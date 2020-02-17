import React from 'react';
import REACTDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Index/Index';
import './asstes/css/common.less';

const App = () => {
  return <div>
    <HashRouter>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </HashRouter>
  </div>;
};

REACTDOM.render(<App/>, document.getElementById('app'));