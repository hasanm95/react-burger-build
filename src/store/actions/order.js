
import {PURCHASE_BURGER_START, PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAIL} from './types.js'
import axios from '../../axios-orders.js';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: PURCHASE_BURGER_SUCCESS,
		id: id,
		orderData: orderData
	}
}

export const purchaseBurgerFail = error => {
	return {
		type: PURCHASE_BURGER_FAIL,
		error: error
	}
}

export const purchaseBurgerStart = () => {
	return{
		type: PURCHASE_BURGER_START
	}
}

export const purchaseBurger = (orderData) => {
	return dispatch => {
		dispatch(purchaseBurgerStart())
		console.log(orderData)
        // axios.post('/orders.json', orderData)
        // .then(response => {
        // 	console.log(response.data)
        //     dispatch(purchaseBurgerSuccess(response.data, orderData))
        // })
        // .catch(error => {
        //     dispatch(purchaseBurgerFail(error))
        // })
	}	
}