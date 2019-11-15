import React, {useEffect} from 'react'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import {useSelector, useDispatch} from 'react-redux';
import {fetchOrders} from '../../store/actions'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


const Orders = () => {
    const orders = useSelector(state => state.order.orders)
    const loading = useSelector(state => state.order.loading)
    const token = useSelector(state => state.auth.token)
    const userId = useSelector(state => state.auth.userId);
    const dispatch = useDispatch()
    const onFetchOrders = () => {
        dispatch(fetchOrders(token, userId))
    }
    useEffect(() => {
        onFetchOrders(token)
    },[])

    let orderOutput = <Spinner/>
    if(!loading){
        orderOutput = orders.map(order => {
            return <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price}    
            />
        })
    }

    return (
        <div className="Orders">
            {orderOutput}
        </div>
    )
}

export default withErrorHandler(Orders, axios)
