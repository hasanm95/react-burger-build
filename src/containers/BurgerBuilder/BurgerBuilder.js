import React, { useState, useEffect, Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const BurgerBuilder = () => {
  const [ingredients, setIngredients] = useState(null);
  const [price, setPrice] = useState(4);
  const [purchageAble, setPurchageAble] = useState(false);
  const [purchaging, setPurchaging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const updatePurchageAble = ingredients => {
    if(ingredients){
      const totalIngredients = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
      setPurchageAble(totalIngredients>0)
    }
  }

  // const updatePrice = type => {
  //   const oldCount = ingredients[type];
  // }

  const addIngredientsHandler = type => {
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    const priceAddition = INGREDIENTS_PRICES[type];
    setIngredients({
      ...ingredients,
      [type]: updatedCount 
    });
    setPrice(price + priceAddition);
  }

  const removeIngredientsHandler = type => {
    const oldCount = ingredients[type];
    if(oldCount <= 0){
      return;
    }
    const updatedCount = oldCount - 1;
    const priceAddition = INGREDIENTS_PRICES[type];
    setIngredients({
      ...ingredients,
      [type]: updatedCount 
    });
    setPrice(price - priceAddition);
  }

  const purchagingHandler = () => {
    setPurchaging(true)
  }

  const cancelPurchagingHandler = () => {
    setPurchaging(false)
  }

  const continuePurchagingHandler = () => {
    // alert('Please, Continue')
    setLoading(true);
    const order = {
        ingredients,
        price: price.toFixed(2),
        customer: {
          name: 'Hasan Mobarak',
          address: {
            street: 'test street',
            zipCode: '3343',
            country: 'Bangladesh'
          },
          email: 'test@test.com',
          deliveryMethod: 'fastest'
        }
    }
    axios.post('/orders.json', order)
      .then(response => {
        setLoading(false);
        setPurchaging(false)
      })
      .catch(error => {
        setLoading(false);
        setPurchaging(false)
      })
  }
  
  useEffect(() => {
    axios.get('https://my-react-burger-68eef.firebaseio.com/ingredients.json')
      .then(res => {
        setIngredients(res.data)
      })
      .catch(err => {
          setError(true)
      })
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
          addIngredients={addIngredientsHandler}
          removeIngredients={removeIngredientsHandler}
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



