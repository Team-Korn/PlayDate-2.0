import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './components/HomePage';

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path="/home" component={HomePage} />
      </Switch>
    </div>
  );
};

export default Routes;
