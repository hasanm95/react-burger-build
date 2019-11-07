import * as actionTypes from '../actions/types';

const INITIAL_STATE = {
	orders: [],
	loading: false
}

const reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case actionTypes.PURCHASE_BURGER_START:
			return {
				...state,
				loading: true
			}
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			const newOrder = {
				...action.orderData,
				id: action.id
			}
			return {
				...state,
				loading: false,
				orders: state.orders.concat(newOrder)
			};
		case actionTypes.PURCHASE_BURGER_FAIL:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
}

export default reducer;