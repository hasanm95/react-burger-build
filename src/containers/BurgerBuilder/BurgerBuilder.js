import React, { useState, useEffect,  Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { useDispatch, useSelector } from "react-redux"
import * as actionTypes from '../../store/actions';




const BurgerBuilder = props => {
  const [purchageAble, setPurchageAble] = useState(false);
  const [purchaging, setPurchaging] = useState(false);
  const [loading] = useState(false);
  const [error] = useState(false);
  const ingredients = useSelector(state => state.ingredients);
  const price = useSelector(state => state.totalPrice);
  const dispatch = useDispatch()
  const onIngredientAdded = name => {
    dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: name
    })
  }
  const onIngredientRemove = name => {
    dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: name
    })
  }

  const updatePurchageAble = ingredients => {
    if(ingredients){
      const totalIngredients = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
      setPurchageAble(totalIngredients>0)
    }
  }

  const purchagingHandler = () => {
    setPurchaging(true)
  }

  const cancelPurchagingHandler = () => {
    setPurchaging(false)
  }

  const continuePurchagingHandler = () => {
    props.history.push('/checkout')
  }
  
  useEffect(() => {
    // axios.get('https://my-react-burger-68eef.firebaseio.com/ingredients.json')
    //   .then(res => {
    //     setIngredients(res.data)
    //   })
    //   .catch(err => {
    //       setError(true)
    //   })
  }, [])

  useEffect(() => {
    updatePurchageAble(ingredients)
  })  

  const disabledInfo = {...ingredients};
  for(let key in disabledInfo){
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummery = null;
  let burger = error ? <p>ingredients cant't be loaded</p>:<Spinner/>;

  if(ingredients){
    burger = (
      <Fragment>
        <Burger ingredients={ingredients}/>
        <BuildControls
          addIngredients={onIngredientAdded}
          removeIngredients={onIngredientRemove}
          disabledInfo={disabledInfo}
          price={price}
          purchageAble={purchageAble}
          ordered={purchagingHandler}
        />
      </Fragment>
    )
    orderSummery = <OrderSummery 
    ingredients={ingredients}
    purchaseCancelled={cancelPurchagingHandler}
    purchaseContiued={continuePurchagingHandler}
    price={price} />
  }
  if(loading){
    orderSummery = <Spinner/>
  }

  return (
    <Fragment>
      <Modal 
        show={purchaging} 
        modalClosed={cancelPurchagingHandler}>
          {orderSummery}
      </Modal>
      {burger}
    </Fragment>
  )
}


export default withErrorHandler(BurgerBuilder, axios);



