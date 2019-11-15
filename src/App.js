import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import Auth from './containers/Auth/Auth';
import {Switch, Route, Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders'
import Logout from './containers/Auth/Logout/Logout'
import {checkAuthState} from './store/actions'

function App() {
  const isAuthenticated = useSelector(state => state.auth.idToken !== null)
  const dispatch = useDispatch();
  const onTryAutoSignUp = () => {
    dispatch(checkAuthState());
  }
  useEffect(() => {
    onTryAutoSignUp()
  }, [])

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  )

  if(isAuthenticated){
    routes = (
      <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
      </Switch>
    )
  }

  return (
    <div className="App">
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default App;
