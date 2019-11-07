import React, { useState, useEffect,  Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { useDispatch, useSelector } from "react-redux"
import * as burgerBuilderActions from '../../store/actions/';


const BurgerBuilder = props => {
  const [purchageAble, setPurchageAble] = useState(false);
  const [purchaging, setPurchaging] = useState(false);
  const ingredients = useSelector(state => state.burgerBuilder.ingredients);
  const error = useSelector(state => state.burgerBuilder.error);
  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const dispatch = useDispatch()

  const onInitIngredients = () => {
    dispatch(burgerBuilderActions.initIngredients())
  }

  const onIngredientAdded = name => {
    dispatch(burgerBuilderActions.addIngredient(name))
  }

  const onIngredientRemove = name => {
    dispatch(burgerBuilderActions.removeIngredient(name))
  }

  const updatePurchageAble = ings => {
    if(ings){
      const totalings = Object.keys(ings)
      .map(igKey => ings[igKey])
      .reduce((sum, el) => sum + el, 0);
      setPurchageAble(totalings>0)
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
    onInitIngredients()
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



