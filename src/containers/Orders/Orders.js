import React, {useEffect} from 'react'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import {useSelector, useDispatch} from 'react-redux';
import {fetchOrders} from '../../store/actions'

const Orders = () => {
    const orders = useSelector(state => state.order.orders)
    const loading = useSelector(state => state.order.loading)
    const dispatch = useDispatch()
    const onFetchOrders = () => {
        dispatch(fetchOrders())
    }
    useEffect(() => {
        onFetchOrders()
    }, [])

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

export default Orders
