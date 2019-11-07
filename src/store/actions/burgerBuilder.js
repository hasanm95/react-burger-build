import {
    ADD_INGREDIENT, 
    REMOVE_INGREDIENT, 
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED} from './types';
import axios from '../../axios-orders';

export const addIngredient = name => {
    return{
        type: ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = name => {
    return {
        type: REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = ingredients => {
    return{
        type: SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://my-react-burger-68eef.firebaseio.com/ingredients.json')
        .then(res => {
            dispatch(setIngredients(res.data))
        })
        .catch(err => {
            dispatch(fetchIngredientsFailed())
        })
    }
}