
import {
	PURCHASE_BURGER_START, 
	PURCHASE_BURGER_SUCCESS, 
	PURCHASE_BURGER_FAIL,
	PURCHASE_INIT,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAIL,
	FETCH_ORDERS_START
} from './types.js'
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
 
export const purchaseBurger = (token, orderData) => {
	return dispatch => {
		dispatch(purchaseBurgerStart())
		const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${orderData.userId}"`
        axios.post(`/orders.json?${queryParams}`, orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
	}	
} 

export const purchaseInit = () => {
	return {
		type: PURCHASE_INIT
	}
}


export const fetchOrdersSuccess = orders => {
	return{
		type: FETCH_ORDERS_SUCCESS,
		orders: orders
	}
}

export const fetchOrdersFail = error => {
	return{
		type: FETCH_ORDERS_FAIL,
		error: error
	}
}

export const fetchOrdersStart = () => {
	return{
		type: FETCH_ORDERS_START
	}
}

export const fetchOrders = (token) => {
	return dispatch => {
		dispatch(fetchOrdersStart());
        axios.get('/orders.json?auth=' + token)
		.then(res => {
			const fetchOrders = [];
			for(let key in res.data){
				fetchOrders.push({
					...res.data[key],
					id: key
				})
			}
			dispatch(fetchOrdersSuccess(fetchOrders));
		})
		.catch(err => {
			dispatch(fetchOrdersFail(err));
		})
	}
}