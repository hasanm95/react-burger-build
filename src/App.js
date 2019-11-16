import React,{useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {checkAuthState} from './store/actions'
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})
const asyncLogout = asyncComponent(() => {
  return import('./containers/Auth/Logout/Logout');
})
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})


function App() {
  const isAuthenticated = useSelector(state => state.auth.token !== null)
  const dispatch = useDispatch();
  const onTryAutoSignUp = () => {
    dispatch(checkAuthState());
  }
  useEffect(() => {
    onTryAutoSignUp()
  }, [])

  
  let routes = (
    <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
    </Switch>
  )

  if(isAuthenticated){
    routes = (
      <Switch>
        <Route path="/orders" component={asyncOrders} />
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/logout" component={asyncLogout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={asyncAuth} />
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
