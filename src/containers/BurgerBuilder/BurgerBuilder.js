import React, { useState, Fragment } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const BurgerBuilder = () => {
  const [ingredients, setIngredients] = useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  });
  const [price, setPrice] = useState(4);
  const [purchageAble, setPurchageAble] = useState(false);

  const updatePurchageAble = ingredients => {
    const updateIngredients = {...ingredients};
    const totalIngredients = Object.keys(ingredients)
    .map(igKey => updateIngredients[igKey])
    .reduce((sum, el) => sum + el, 0);
    setPurchageAble(totalIngredients>0)
  }

  const addIngredientsHandler = type => {
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...ingredients
    }
    const priceAddition = INGREDIENTS_PRICES[type];
    setIngredients({
      ...ingredients,
      [type]: updatedCount 
    });
    console.log(updatedIngredients)
    setPrice(price + priceAddition);
    updatePurchageAble(updatedIngredients)
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

  const disabledInfo = {...ingredients};
  for(let key in disabledInfo){
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  return (
    <Fragment>
      <Burger ingredients={ingredients}/>
      <BuildControls
        addIngredients={addIngredientsHandler}
        removeIngredients={removeIngredientsHandler}
        disabledInfo={disabledInfo}
        price={price}
        purchageAble={purchageAble}
      />
    </Fragment>
  )
}

// class BurgerBuilder extends React.Component{
//   state = {
//     ingredients: {
//       salad: 0,
//       bacon: 0,
//       cheese: 0,
//       meat: 0      
//     },    
//     price: 4,
//     purchageAble: false
//   }
//   updatePurchaseState = ingredients => {
//     const updateIngredients = {...ingredients};
//     const totalIngredients = Object.keys(ingredients)
//     .map(igKey => updateIngredients[igKey])
//     .reduce((sum, el) => sum + el, 0);
//     this.setState( {purchageAble: totalIngredients>0} );
//   }

//   addIngredientsHandler = type => {
//     const oldCount = this.state.ingredients[type];
//     const updatedCount = oldCount + 1;
//     const updatedIngredients = {
//         ...this.state.ingredients
//     };
//     updatedIngredients[type] = updatedCount;
//     const priceAddition = INGREDIENTS_PRICES[type];
//     const oldPrice = this.state.totalPrice;
//     const newPrice = oldPrice + priceAddition;
//     this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
//     console.log(updatedIngredients);
//     this.updatePurchaseState(updatedIngredients);
//   }

//   // removeIngredientsHandler = type => {
//   //   const oldCount = ingredients[type];
//   //   if(oldCount <= 0){
//   //     return;
//   //   }
//   //   const updatedCount = oldCount - 1;
//   //   const priceAddition = INGREDIENTS_PRICES[type];
//   //   setIngredients({
//   //     ...ingredients,
//   //     [type]: updatedCount 
//   //   });
//   //   setPrice(price - priceAddition);
//   // }


//   render(){
//     const disabledInfo = {...this.state.ingredients};
//     for(let key in disabledInfo){
//       disabledInfo[key] = disabledInfo[key] <= 0;
//     }
//     return (
//       <Fragment>
//         <Burger ingredients={this.state.ingredients}/>
//         <BuildControls
//           addIngredients={this.addIngredientsHandler}
//           removeIngredients={this.removeIngredientsHandler}
//           disabledInfo={disabledInfo}
//           price={this.state.price}
//           purchageAble={this.state.purchageAble}
//         />
//       </Fragment>
//     )
//   }
// }


export default BurgerBuilder;



