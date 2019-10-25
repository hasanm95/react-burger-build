import React from 'react'
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({ingredients}) => {
  //const ingredientsArray = Object.keys(ingredients);
  //["salad", "bacon", "cheese", "meat"]

  //const ingredientsArray = Object.keys(ingredients).map(igKey => ingredients[igKey]);
  //[1, 1, 2, 2]

  //const ingredientsArray = Object.keys(ingredients).map(igKey => [...Array(ingredients[igKey])]);
  // 0: [undefined]
  // 1: [undefined]
  // 2: (2) [undefined, undefined]
  // 3: (2) [undefined, undefined]
  let ingredientsArray = Object.keys(ingredients)
    .map(igKey => [...Array(ingredients[igKey])]
    .map((_, i) => <BurgerIngredient type={igKey} key={igKey + i} />))
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);

  if(ingredientsArray.length < 1){
    ingredientsArray = <p>Please start adding ingredients</p>;
  }
  

  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {ingredientsArray}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default Burger;
