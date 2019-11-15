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
  const isAuthenticated = useSelector(state => state.auth.token !== null)
  // const dispatch = useDispatch();
  // const onTryAutoSignUp = () => {
  //   dispatch(checkAuthState());
  // }
  // useEffect(() => {
  //   onTryAutoSignUp()
  // }, [])



  return (
    <div className="App">
      <Layout>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/orders" component={Orders} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Layout>
    </div>
  );
}

export default App;
